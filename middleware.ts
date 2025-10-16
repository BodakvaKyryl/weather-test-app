import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/weather-dashboard") {
    return NextResponse.next();
  }

  const cityPathnameRegex = /^\/city\/[^/]+$/;

  if (cityPathnameRegex.test(pathname)) {
    const latString = request.nextUrl.searchParams.get("lat");
    const lonString = request.nextUrl.searchParams.get("lon");

    const numericRegex = /^-?\d+(\.\d+)?$/;

    if (
      !latString ||
      !lonString ||
      !numericRegex.test(latString) ||
      !numericRegex.test(lonString)
    ) {
      return NextResponse.redirect(new URL("/weather-dashboard", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/weather-dashboard", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
