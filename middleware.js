export { default } from "next-auth/middleware";

export const config = { matcher: ["/dash", "/write", "/profile/:path*", "/chat"] };
