"use client";
import { useParams } from "next/navigation";
import axios from "axios";
  
export default function AddTask() {
  
  const createTask = () => {
    axios
      .post("http://localhost:3000/task", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        title: "Title",
        description: "Description",
      })
      .then((response) => {
        console.log(response.data);
      });
    console.log("Task created");
  };

    const userId = useParams();

    console.log("The userID is: ", userId.userId);
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] fixed top-44 left-[34rem] w-1/4 h-2/4 border rounded-lg">
      <h1 className="text-2xl p-2 font-bold">Add Task</h1>
      <form
        onSubmit={createTask}
        className="flex flex-col gap-4 h-full justify-between rounded-md"
      >
        <div className="flex flex-col p-2">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Title" id="title" />
          <label htmlFor="Description">Description</label>
          <input type="text" placeholder="Description" id="title" />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <button type="submit" className="bg-slate-400 p-2 rounded-md">
            Cancel
          </button>
          <button type="submit" className="bg-slate-600 p-2 rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}