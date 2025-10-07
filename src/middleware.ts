import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// I tried using "/details/*" but it's not working.
// As we are matching with startsWith function.
const protectedRoutes = ["/home", "/details/"];

export async function middleware(request: NextRequest) {
  // request.nextUrl returns an object containing browser data.
  // pathname starts after the root.
  // localhost:3000 -> pathname: '/'
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route)
  );

  const token = await getToken({ req: request });
//   console.log("token data: ",token);
  

  // token is null if not logged in.
  if (isProtectedRoute && !token) {
    // if not logged in redirect to homepage
    return NextResponse.redirect(new URL("/", request.url));
    // return NextResponse.redirect(new URL("api/auth/signin", request.url));
  }
  return NextResponse.next();
}
