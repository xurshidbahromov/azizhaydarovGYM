import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static and api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If visiting /uz, allow
  if (pathname === "/uz" || pathname.startsWith("/uz/")) {
    return NextResponse.next();
  }

  // Redirect root / and all other routes directly to /uz
  const newUrl = new URL(`/uz`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
