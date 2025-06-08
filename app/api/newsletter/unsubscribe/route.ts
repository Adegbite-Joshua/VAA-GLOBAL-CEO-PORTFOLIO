import { type NextRequest, NextResponse } from "next/server"
import { unsubscribeEmail } from "@/lib/models/newsletter"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email address is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address" }, { status: 400 })
    }

    const result = await unsubscribeEmail(email)

    if (result) {
      return NextResponse.json({
        success: true,
        message: "You have been successfully unsubscribed from our newsletter. We're sorry to see you go!",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Email address not found in our subscription list. You may have already unsubscribed.",
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("Error unsubscribing email:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your unsubscribe request. Please try again." },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  // Handle GET requests for direct unsubscribe links
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribe", request.url))
  }

  try {
    const email = Buffer.from(token, "base64").toString("utf-8")
    const result = await unsubscribeEmail(email)

    if (result) {
      // Redirect to unsubscribe page with success message
      return NextResponse.redirect(new URL(`/unsubscribe?success=true&email=${encodeURIComponent(email)}`, request.url))
    } else {
      // Redirect to unsubscribe page with error
      return NextResponse.redirect(new URL("/unsubscribe?error=not_found", request.url))
    }
  } catch (error) {
    console.error("Error processing unsubscribe:", error)
    return NextResponse.redirect(new URL("/unsubscribe?error=invalid_token", request.url))
  }
}
