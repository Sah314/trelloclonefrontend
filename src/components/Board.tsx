"use client";
import React, { useEffect } from "react";
import CardColumn from "./cardColumn";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import axios from "axios";
//import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";

export interface CardInfo {
  id: number;
  createdAt: string;
  title: string;
  taskstatus: string; // Enum-like restriction
  description: string;
}

const Board = (userId:{userId:string}) => {
  //const router = useRouter();
  //console.log("The userID is in Board: ",userId.userId);

  const form = useForm({
    mode: "all",
    defaultValues: {
      title: "title",
      description: "description",
    },
  });

  const [data, setData] = React.useState<CardInfo[]>([]);
  const [columns, setColumns] = React.useState<CardInfo[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //console.log(response.data);
      setData(response.data);
      setColumns(response.data);
    };
    FetchData();
    // Fetch data from the server
    // You can use the userId to fetch the user's board data
  }, [userId]);
  
  const handleStart = (e: unknown) => {
    console.log(data);
    console.log("Start", e);
  };

  const handleDrag = (e: unknown) => {
    console.log("Drag", e);
  };

  const handleStop = (result: DropResult) => {
    // console.log("URL::",
    //   `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task/${result.draggableId}`
    // );
    // console.log("taskstatus::", result.destination?.droppableId);

    console.log("Stop", result);

    console.log("Stop", result);
    const { source, destination } = result;

    if (!destination) return; // Dropped outside the list
    // Add your reorder logic here if you want to move tasks
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const taskId = result.draggableId.split("_")[2];
    console.log("TaskId::", taskId);
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task/${taskId}`,
        {
          taskstatus: result.destination?.droppableId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          console.log("Task status updated");
          // Handle the response
        }
      });
    const sourceColumn = columns.filter(
      (card: CardInfo) =>
        card.taskstatus.toLowerCase() === source.droppableId.toLowerCase()
    );

    const destinationColumn = columns.filter(
      (card) =>
        card.taskstatus.toLowerCase() === destination.droppableId.toLowerCase()
    );
    console.log(sourceColumn);

    const [movedCard] = sourceColumn.splice(source.index, 1);
    // Change the status of the card based on the destination column
    movedCard.taskstatus = destination.droppableId;

    console.log(movedCard);

    // Insert the card into the destination column
    destinationColumn.splice(destination.index, 0, movedCard);

    // Update state
    setColumns([...columns]);
  };

  const onSubmit = async() => {
    console.log("Create new task");
    const vals = form.getValues();
    console.log(vals.title);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task`,
      { title:vals.title, description:vals.description }, // Pass the form data
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 201) {
      console.log("Task created:", response.data);
      // Handle success (e.g., reset form, show a success message, etc.)
       window.location.reload();
    }
  } catch (error) {
    console.error("Error creating task:", error);
    // Handle the error (e.g., show an error message)
  }  
  
  }


  return (
    <section className=" overflow-x-hidden w-full">
      <div className="flex items-center justify-center flex-col h-full mt-8 w-full">
        <div className="flex flex-row justify-start w-full mx-2 px-2">
          <Dialog>
            <DialogTrigger className="bg-slate-900 p-2 px-4 rounded-xl text-white m-3">
              Add New Task
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Task</DialogTitle>
                <DialogDescription>
                  Please Enter the details of the task
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 p-3"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{
                      required: "Title field is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="title" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please enter the description"
                            {...field}
                            {...form.register("description")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="inline-flex justify-end w-full gap-4">
                    <DialogClose asChild>
                      <Button type="button" variant={"destructive"}>
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-row gap-3 flex-grow w-full h-full p-3 m-3">
          <DragDropContext
            onDragStart={handleStart}
            onDragEnd={handleStop}
            onDragUpdate={handleDrag}
          >
            <CardColumn Heading="TODO" cardInfo={columns} />
            <CardColumn Heading="INPROGRESS" cardInfo={columns} />
            <CardColumn Heading="DONE" cardInfo={columns} />
          </DragDropContext>
        </div>
      </div>
    </section>
  );
};

export default Board;
