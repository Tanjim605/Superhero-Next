import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// I tried using "/details/*" but it's not working.
// As we are matching with startsWith function.
const protectedRoutes = ["/home", "/details/"];

export async function middleware(request: NextRequest) {
  const session = await auth();

  // request.nextUrl returns an object containing browser data.
  // pathname starts after the root.
  // localhost:3000 -> pathname: '/'
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.find((route) => pathname.startsWith(route));

  // session is null if not logged in.
  if (isProtectedRoute && !session) {
    // if not logged in redirect to homepage
    return NextResponse.redirect(new URL("/", request.url));
    // return NextResponse.redirect(new URL("api/auth/signin", request.url));
  }
  return NextResponse.next();
}
