import { TaskData } from "@/global/tasktypes";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    let res;
    if (user?.isAdmin) {
      res = await prisma.task.findMany({
        include: {
          user: true
        }
      });
    } else {
      res = await prisma.task.findMany({
        where: {
          userId: parseInt(id),
        },
        include: {
          user: true
        }
      });
    }
    return NextResponse.json({
      success: true,
      message: `${id} retirevied`,
      body: res,
    });
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({
      success: false,
      message: "Something bad happened, please try again",
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const formData = (await req.formData()) as unknown as Iterable<
    [TaskData, FormDataEntryValue]
  >;
  const id = params.id;
  const body = Object.fromEntries(formData);
  if (body.priority === "on") {
    body.priority = true;
  } else {
    body.priority = false;
  }
  body.userId = parseInt(body.userId);
  const data: TaskData = body;

  try {
    const res = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
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
      message: "Task updated",
    });
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({
      success: false,
      message: "Something bad happened, please try again",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  try {
    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({
      success: true,
      message: `task deleted`,
    });
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({
      success: false,
      message: "Something bad happened, please try again",
    });
  }
}
