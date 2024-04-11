import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;

  const url = new URL(req.nextUrl.origin);

  if (!token?.sub) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/create/:path*", "/collection/:path*"],
};
