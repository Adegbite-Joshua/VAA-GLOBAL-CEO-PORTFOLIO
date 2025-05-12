import { NextResponse } from "next/server"
import { createAdminUser } from "@/lib/auth"

// This route should be secured in production
// It's for initial admin user creation
export async function POST(request: Request) {
  try {
    // Check for a secret key to secure this endpoint
    const { name, email, password, secretKey } = await request.json()

    // Verify the secret key
    const expectedSecretKey = process.env.ADMIN_SECRET_KEY || "change-this-in-production"
    if (secretKey !== expectedSecretKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Create admin user
    const result = await createAdminUser({ name, email, password })

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      id: result.id,
    })
  } catch (error: any) {
    console.error("Error creating admin user:", error)
    return NextResponse.json({ error: error.message || "Failed to create admin user" }, { status: 500 })
  }
}
