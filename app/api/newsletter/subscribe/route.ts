import { NextResponse } from "next/server"
import { subscribeEmail, getActiveSubscribers } from "@/lib/models/newsletter"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const subscribers = await getActiveSubscribers()
    return NextResponse.json(subscribers)
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch newsletter subscribers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Basic validation
    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const result = await subscribeEmail(data.email)

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    console.error("Error processing newsletter subscription:", error)
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 })
  }
}
