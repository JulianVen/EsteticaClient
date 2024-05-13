import { auth } from "@/auth";

const publicRoutes = [
    "/", "/login", "/register"
]

export default auth((req) => {
    const pathname = req.nextUrl.pathname;

    if (req.auth === null && !publicRoutes.includes(pathname)) {
        const url = `${req.nextUrl.origin}/login`;
        return Response.redirect(url);
    }

})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/login"],
};