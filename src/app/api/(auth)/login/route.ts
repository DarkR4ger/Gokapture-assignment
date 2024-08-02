import { LoginData } from "@/global/authtype";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "@/lib/auth";
import { cookies } from "next/headers";

const { SECRET_KEY } = process.env;

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [LoginData, FormDataEntryValue]
  >;
  const data: LoginData = Object.fromEntries(formData);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exists, please register",
        },
        { status: 401 },
      );
    }

    const check = await bcrypt.compare(data.password, user.password);

    if (!check) {
      return NextResponse.json(
        {
          success: false,
          message: "User credentials does not match with database",
        },
        { status: 401 },
      );
    }

    const token = await sign(
      { userId: user.id, emailId: user.email },
      SECRET_KEY,
    );

    cookies().set("token", token);

    return NextResponse.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log((err as Error).message)
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });

  }
}
