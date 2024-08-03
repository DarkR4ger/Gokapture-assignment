import { TaskData } from "@/global/tasktypes";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [TaskData, FormDataEntryValue]
  >;
  const body = Object.fromEntries(formData);
  if (body.priority === "on") {
    body.priority = true;
  } else {
    body.priority = false;
  }
  console.log(body.userId)
  body.userId = parseInt(body.userId);
  const data: TaskData = body;
  try {
    const res = await prisma.task.create({
      data: {
        title: data.taskTitle,
        description: data.taskDescription,
        status: data.taskStatus,
        priority: data.priority,
        dueDate: data.dueDate,
        userId: data.userId,
      },
    });
    if (!res) {
      return NextResponse.json({
        success: false,
        message: "Data wrong",
      });
    }
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "Task added",
    });
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({
      success: false,
      message: "Something bad happened, please try again",
    });
  }
}

