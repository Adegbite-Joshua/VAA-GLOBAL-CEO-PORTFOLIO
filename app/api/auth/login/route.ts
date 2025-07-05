import { NextResponse } from "next/server"
import { getUserByEmail, User } from "@/lib/models/user"
import { connectToDatabase } from "@/lib/mongoose"
import { signJwtToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find user
    const user = await getUserByEmail(email)  as User | null
 
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

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
      message: "Login successful",
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
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 })
  }
}
