"use server";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";

const { SECRET_KEY } = process.env;

interface AuthenticationResponse {
  success: boolean;
  data?: {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

interface DecodedData {
  userId: number;
  emailId: string;
}

export default async function Authentication(): Promise<AuthenticationResponse> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return {
      success: false,
    };
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(SECRET_KEY),
  );
  const decoded = payload as unknown as DecodedData;

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      isAdmin: true,
    },
  });

  if (!user) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: user,
  };
}

export async function sign(
  payload: DecodedData,
  secret: string,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("1d")
    .setIssuedAt()
    .sign(new TextEncoder().encode(secret));
}
