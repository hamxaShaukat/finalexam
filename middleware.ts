import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  console.log("Request URL:", nextUrl.pathname);
  console.log("Auth object:", req.auth?.user.email);
  if(nextUrl.pathname.startsWith("/tasklist")){
    if(!req.auth?.user){
      console.log("Redirecting to login: user not authenticated");
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};