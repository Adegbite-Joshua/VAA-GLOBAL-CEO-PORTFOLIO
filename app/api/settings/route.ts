import { NextResponse } from "next/server"
import { getSettings, updateSettings } from "@/lib/models/settings"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Basic validation
    if (!data.siteName || !data.tagline || !data.description || !data.contactEmail) {
      return NextResponse.json(
        { error: "Site name, tagline, description, and contact email are required" },
        { status: 400 },
      )
    }

    const result = await updateSettings({
      ...data,
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings: result,
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
