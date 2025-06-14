import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  //check private paths
  if (privatePaths.includes(pathname) && !sessionToken) {
    // If the user is not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  //check auth paths
  if (authPaths.includes(pathname) && sessionToken) {
    // If the user is authenticated, redirect to home
    return NextResponse.redirect(new URL("/me", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/me"],
};
