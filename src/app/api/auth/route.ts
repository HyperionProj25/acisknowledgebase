import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth-token";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

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

  const token = await createSessionToken(SESSION_MAX_AGE_SECONDS);
  const response = NextResponse.json({ success: true });
  response.cookies.set("acis-auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return response;
}
