import { NextResponse } from "next/server"
import { getAllMediaItems, getMediaItemsByType, getFeaturedMediaItems, createMediaItem } from "@/lib/models/media"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "video" | "podcast" | "article" | null
    const featured = searchParams.get("featured")

    let mediaItems
    if (featured === "true") {
      mediaItems = await getFeaturedMediaItems()
    } else if (type) {
      mediaItems = await getMediaItemsByType(type)
    } else {
      mediaItems = await getAllMediaItems()
    }

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error("Error fetching media items:", error)
    return NextResponse.json({ error: "Failed to fetch media items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Basic validation
    if (!data.title || !data.description || !data.type || !data.link) {
      return NextResponse.json({ error: "Title, description, type, and link are required" }, { status: 400 })
    }

    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Set defaults for optional fields
    const mediaItem = {
      ...data,
      date: data.date || new Date(),
      featured: data.featured || false,
    }

    const result = await createMediaItem(mediaItem)

    return NextResponse.json({
      success: true,
      message: "Media item created successfully",
      id: result._id,
    })
  } catch (error) {
    console.error("Error creating media item:", error)
    return NextResponse.json({ error: "Failed to create media item" }, { status: 500 })
  }
}
