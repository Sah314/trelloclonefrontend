"use client";
import React from "react";
import { CardInfo } from "./Board";
//import { useRouter } from "next/navigation";
import { Card,CardTitle,CardDescription,CardContent } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {Menu} from "lucide-react"
// import { Badge } from "./ui/badge";
const Task = ({title,description,createdAt }: CardInfo) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long", // Full month name (e.g., September)
    day: "numeric", // Day of the month (1-31)
   // hour: "2-digit", // Hour (0-23)
    //minute: "2-digit", // Minute (00-59)
   // second: "2-digit", // Second (00-59)
    hour12: true, // 12-hour format
  });

  //console.log(formattedDate); // Output: September 19, 2024, 7:07:36 AM

  //const router = useRouter();

  // const editTask = () => {
  //   console.log("Editing task with id:", id);
  //   router.push("/board/editTask/"+id.toString());
  // };
  // const viewTask = () => {
  //   console.log("Viewing task with id:", id);
  //   router.push("/board/viewTask/"+id.toString());
  // };

  return (
    // <Card className="
    // bg-gradient-to-tr from-[#40ffca] via-[#9a76a4] to-[#da0e7f]
    // ">
    <Card className=" bg-[#00ced1]">
      <div className=" w-full inline-flex justify-between mt-5">
        <CardTitle className=" px-5 font-bold">{title}</CardTitle>
        {/* <Badge variant="destructive" className="mr-3">
          Badge
        </Badge> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-3">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Change Severity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> 

      <CardContent className="font-semibold">{description}</CardContent>
      <CardDescription className="p-5">{formattedDate}</CardDescription>
    </Card>
  );
};

export default Task;
