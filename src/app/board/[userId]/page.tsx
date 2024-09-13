"use client";
import Board from "@/ui/components/Board";
import { useParams } from "next/navigation";

export default function UserBoard() {
 const userId = useParams();

console.log("The userID is: ",userId.userId);
  return (
    <div className="board-container">
      <Board userId={parseInt(userId.userId[0])} />
      {/* Pass the slug to the Board component */}
    </div>
  );
}
