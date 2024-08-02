import { RegisterData } from "@/global/authtype";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [RegisterData, FormDataEntryValue]
  >;
  const data: RegisterData = Object.fromEntries(formData);

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: `${data.email} already exists, please login`,
        },
        { status: 401 },
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    console.log(data)

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully, please login",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log((err as Error).message)
    return NextResponse.json({
      success: true,
      message: "User registered successfully, please login",
    });
  }
}
