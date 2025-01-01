import { auth } from "@/auth";

export default auth((req) => {
  const publicPaths = ["/login", "/signup"];
  if (!req.auth && !publicPaths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (req.auth && publicPaths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
