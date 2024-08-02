import { NextRequest, NextResponse } from "next/server";
import Authentication from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const res = await Authentication();
  let newHeaders;
  if (res.success) {
    const data = JSON.stringify(res.data);

    newHeaders = new Headers(req.headers);

    newHeaders.set("data", data);
  }

  if (pathname === "/") {
    if (!res.success) {
      return NextResponse.redirect(new URL("/login", origin));
    }
    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  }

  if (pathname === "/register" || pathname === "/login") {
    if (res.success) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
