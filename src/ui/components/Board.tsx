"use client";
import React, { useEffect } from "react";
import CardColumn from "./cardColumn";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import axios from "axios";
import { useRouter } from "next/navigation";
//import { data } from "@/app/data";
//type Props = {}
export interface CardInfo {
  id: number;
  createdAt: string;
  title: string;
  taskstatus: string; // Enum-like restriction
  description: string;
}

const Board = (userId:{userId:number}) => {
  const router = useRouter();
  console.log("The userID is in Board: ",userId.userId);
const [data, setData] = React.useState<CardInfo[]>([]);
const [columns, setColumns] = React.useState<CardInfo[]>([]);

useEffect(() => {
  const fetchData = async()=>{
    const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }});
    //console.log(response.data);
    setData(response.data);
    setColumns(response.data);
  }
  fetchData();
  // Fetch data from the server
  // You can use the userId to fetch the user's board data
}, [userId]);



console.log("col:::",data);
//  const todoCards:CardInfo[] = columns.filter(
//    (card: CardInfo) => card.taskstatus === "TODO"
//  );
//  const inProgressCards:CardInfo[] = columns.filter(
//    (card: CardInfo) => card.taskstatus === "INPROGRESS"
//  );
//  const doneCards: CardInfo[] = columns.filter(
//    (card: CardInfo) => card.taskstatus === "DONE"
//  );

     const handleStart = (e: unknown) => {
       console.log("Start", e);
     };

     const handleDrag = (e: unknown) => {
       console.log("Drag", e);
     };

     const handleStop = (result: DropResult) => {
       // axios.patch(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task/${result.draggableId}`).then((response) => {

       // });

       console.log("Stop", result);
       const { source, destination } = result;

       if (!destination) return; // Dropped outside the list
       // Add your reorder logic here if you want to move tasks
       if (
         source.droppableId === destination.droppableId &&
         source.index === destination.index
       )
         return;

       const sourceColumn = columns.filter(
         (card: CardInfo) =>
           card.taskstatus.toLowerCase() === source.droppableId.toLowerCase()
       );

       const destinationColumn = columns.filter(
         (card) =>
           card.taskstatus.toLowerCase() ===
           destination.droppableId.toLowerCase()
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

const createNewTask = () => {
  console.log("Create new task");
  router.push("/board/addTask");
  }



  return (
    <section className=" overflow-x-hidden w-full">
      <div className="flex flex-row h-10 bg-blue-500 justify-between">
        Board
        <div className="flex flex-row gap-4">
          <button className="text-white">Login</button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col h-full mt-8 w-full">
        <div className="flex flex-row justify-start w-full mx-2 px-2">
          <button className=" text-white bg-blue-500 p-1 rounded-md w-44" onClick={createNewTask}>
            Add Task
          </button>
        </div>
        <div className="shadow-md flex flex-row p-3 justify-start m-3 border w-[85%]">
          <span className="">Search:</span>
          <input type="text" className="border-2" />
        </div>
        <div className="flex flex-row gap-12">
          <DragDropContext
            onDragStart={handleStart}
            onDragEnd={handleStop}
            onDragUpdate={handleDrag}
          >
            <CardColumn Heading="Todo" cardInfo={columns} />
            <CardColumn Heading="InProgress" cardInfo={columns} />
            <CardColumn Heading="Done" cardInfo={columns} />
          </DragDropContext>
        </div>
      </div>
    </section>
  );
};

export default Board;
