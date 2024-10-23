import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshAccessToken } from "./data/auth/authentication";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  if (!accessToken && refreshToken) {
    const response = await refreshAccessToken();
    return response;
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
