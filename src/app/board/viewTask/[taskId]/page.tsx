"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { CardInfo } from "@/components/Board";
export default function ViewTask() {
  const taskId = useParams();
  const [task, setTask] = useState<CardInfo>(); // Initialize task as null to fetch the data
  const router = useRouter();

  // Fetch task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/task/${taskId.taskId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTask(response.data); // Set the task data from the API
        console.log("Task fetched:", response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        // Handle the error (e.g., show an error message)
      }
    };

    fetchTask();
  }, [taskId.taskId]); // Re-fetch task if taskId changes

  if (!task) {
    // Display a loading message until the task data is fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] fixed top-44 left-[34rem] w-1/4 h-2/4 border rounded-lg bg-slate-100">
      <h1 className="text-2xl p-2 font-bold">View Task</h1>
      <div className="flex flex-col p-2">
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description || "No description"}
        </p>
        <p>
          <strong>Task Status:</strong> {task.taskstatus}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-row justify-end gap-2">
        <button
          type="button"
          className="bg-slate-600 p-2 rounded-md"
          onClick={() => router.push(`/board/${task.id}`)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
