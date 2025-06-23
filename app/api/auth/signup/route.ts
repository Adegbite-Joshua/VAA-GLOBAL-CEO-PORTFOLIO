import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getUserByEmail, createUser } from "@/lib/models/user"
import { connectToDatabase } from "@/lib/mongoose"
import { signJwtToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { name, email, password, adminKey } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // Determine role based on admin key
    const isAdmin = adminKey === process.env.ADMIN_SECRET_KEY
    const role = isAdmin ? "admin" : "user"

    // Create user
    // const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({
      name,
      email,
      password,
      role,
    })

    // Generate JWT token
    const token = await signJwtToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    })

    // Set cookie
    const response = NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return response
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
