import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      success: true,
      message: 'User retrieved',
      body: users
    })
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({
      success: false,
      message: "Something bad happened, please try again",
    });
  }
}
