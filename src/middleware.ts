import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle PIN verification directly in middleware (edge function)
  // This ensures env vars are accessible on Netlify
  if (pathname === "/api/auth" && request.method === "POST") {
    const { pin } = await request.json();
    const sitePin = process.env.SITE_PIN;

    if (!sitePin) {
      return NextResponse.json(
        { error: "PIN not configured on server" },
        { status: 500 }
      );
    }

    if (pin !== sitePin) {
      return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("acis-auth", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  // Allow login page and static assets through
  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png"
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("acis-auth");
  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  // Redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon.png|fonts/).*)"],
};
