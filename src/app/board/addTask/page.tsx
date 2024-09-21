"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function AddTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task`,
        { title, description }, // Pass the form data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Task created:", response.data);
        router.push("/board/" + response.data.userId.toString());
        // Handle success (e.g., reset form, show a success message, etc.)
        
      }
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle the error (e.g., show an error message)
    }
  };


  return (
    <div className="font-[family-name:var(--font-geist-sans)] fixed top-44 left-[34rem] w-1/4 h-2/4 border rounded-lg bg-slate-100">
      <h1 className="text-2xl p-2 font-bold">Add Task</h1>
      <form
        onSubmit={createTask}
        className="flex flex-col gap-4 h-full justify-between rounded-md"
      >
        <div className="flex flex-col p-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Capture the input value
            required
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Capture the input value
            required
          />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <button
            type="button"
            className="bg-slate-400 p-2 rounded-md"
            onClick={() => {
              setTitle("");
              setDescription("");
            }}
          >
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
