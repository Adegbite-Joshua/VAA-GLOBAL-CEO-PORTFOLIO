import { type NextRequest, NextResponse } from "next/server"
import { getAllSubscribers, getActiveSubscribers, subscribeEmail } from "@/lib/models/newsletter"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get("active") === "true"

    const subscribers = activeOnly ? await getActiveSubscribers() : await getAllSubscribers()

    return NextResponse.json({
      success: true,
      subscribers,
    })
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch subscribers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const result = await subscribeEmail(email)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error adding subscriber:", error)
    return NextResponse.json({ success: false, message: "Failed to add subscriber" }, { status: 500 })
  }
}
