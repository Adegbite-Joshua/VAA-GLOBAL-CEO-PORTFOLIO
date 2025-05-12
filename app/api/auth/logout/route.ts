import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  })

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  })

  return response
}
