import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { pin } = await request.json();

  const sitePin = process.env.SITE_PIN;
  if (!sitePin) {
    return NextResponse.json(
      { error: "PIN not configured on server" },
      { status: 500 }
    );
  }

  if (String(pin).trim() !== sitePin.trim()) {
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
