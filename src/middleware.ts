import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  //   `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role == "user"
    ) {
      return NextResponse.rewrite(new URL("/account", req.url));
    }
    if (
        req.nextUrl.pathname.startsWith("/account") &&
        req.nextauth.token?.role == "admin"
      ) {
        return NextResponse.rewrite(new URL("/admin", req.url));
      }
  },

  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (
          token?.role == "user" &&
          req.nextUrl.pathname.startsWith("/account")
        ) {
          return true;
        }
        if (
          token?.role == "admin" &&
          req.nextUrl.pathname.startsWith("/admin")
        ) {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = { matcher: ["/account/:path*", "/admin/:path*"] };
