import { NextResponse } from "next/server"
import Media, { getMediaItemBySlug, updateMediaItem, deleteMediaItem } from "@/lib/models/media"
import { connectToDatabase } from "@/lib/mongoose"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    await connectToDatabase()

    let mediaItem
    // Check if id is a MongoDB ObjectId or a slug
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      mediaItem = await Media.findById(id)
    } else {
      mediaItem = await getMediaItemBySlug(id)
    }

    if (!mediaItem) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 })
    }

    return NextResponse.json(mediaItem)
  } catch (error) {
    console.error("Error fetching media item:", error)
    return NextResponse.json({ error: "Failed to fetch media item" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Basic validation
    if (!data.title || !data.description || !data.type || !data.link) {
      return NextResponse.json({ error: "Title, description, type, and link are required" }, { status: 400 })
    }

    // Handle date conversion if needed
    if (data.formattedDate) {
      data.date = new Date(data.formattedDate)
      delete data.formattedDate
    }

    const result = await updateMediaItem(id, data)

    if (!result) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Media item updated successfully",
      mediaItem: result,
    })
  } catch (error) {
    console.error("Error updating media item:", error)
    return NextResponse.json({ error: "Failed to update media item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const result = await deleteMediaItem(id)

    if (!result) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Media item deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting media item:", error)
    return NextResponse.json({ error: "Failed to delete media item" }, { status: 500 })
  }
}
