import { NextResponse } from "next/server"
import { getAllServices, getFeaturedServices, createService } from "@/lib/models/service"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let services
    if (featured === "true") {
      services = await getFeaturedServices()
    } else {
      services = await getAllServices()
    }

    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Basic validation
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Set defaults for optional fields
    const service = {
      ...data,
      features: data.features || [],
      options: data.options || [],
      featured: data.featured || false,
    }

    const result = await createService(service)

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      id: result._id,
    })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
