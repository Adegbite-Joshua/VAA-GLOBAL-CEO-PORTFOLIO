import { NextResponse } from "next/server"
import { getAllMediaItems, getMediaItemsByType, getFeaturedMediaItems, createMediaItem } from "@/lib/models/media"
import { verifyAuth } from "@/lib/auth"

import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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

// export async function POST(request: Request) {
//   try {
//     // Verify authentication
//     const session = await verifyAuth()
//     if (!session || session.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const data = await request.json()

//     // Basic validation
//     if (!data.title || !data.description || !data.type || !data.link) {
//       return NextResponse.json({ error: "Title, description, type, and link are required" }, { status: 400 })
//     }

//     // Generate slug if not provided
//     if (!data.slug) {
//       data.slug = data.title
//         .toLowerCase()
//         .replace(/[^\w\s]/gi, "")
//         .replace(/\s+/g, "-")
//     }

//     // Set defaults for optional fields
//     const mediaItem = {
//       ...data,
//       date: data.date || new Date(),
//       featured: data.featured || false,
//     }

//     const result = await createMediaItem(mediaItem)

//     return NextResponse.json({
//       success: true,
//       message: "Media item created successfully",
//       id: result._id,
//     })
//   } catch (error) {
//     console.error("Error creating media item:", error)
//     return NextResponse.json({ error: "Failed to create media item" }, { status: 500 })
//   }
// }

export async function POST(request: Request) {
  try {
    // Verify authentication
    const formData = await request.formData()

    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as string
    const url = formData.get("url") as string
    const location = formData.get("location") as string
    const featured = formData.get("featured") === "true"
    const thumbnailFile = formData.get("thumbnail") as File | null

    // Basic validation
    if (!title || !type || !url) {
      return NextResponse.json({ error: "Title, type, and URL are required" }, { status: 400 })
    }

    // Validate media type
    const validTypes = ["image", "video", "document", "audio"]
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid media type" }, { status: 400 })
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    let thumbnailUrl = ""

    // Handle thumbnail upload if provided
    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        // Convert file to buffer
        const bytes = await thumbnailFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "media-thumbnails",
                transformation: [
                  { width: 600, height: 400, crop: "fill" },
                  { quality: "auto" },
                  { fetch_format: "auto" },
                ],
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              },
            )
            .end(buffer)
        })

        thumbnailUrl = (uploadResponse as any).secure_url
      } catch (uploadError) {
        console.error("Error uploading thumbnail:", uploadError)
        return NextResponse.json({ error: "Failed to upload thumbnail" }, { status: 500 })
      }
    }

    // Create media item data
    const mediaItem = {
      title,
      slug,
      description: description || "",
      type,
      link: url,
      location,
      image: thumbnailUrl,
      featured,
      date: new Date(),
    }

    const result = await createMediaItem(mediaItem)

    return NextResponse.json({
      success: true,
      message: "Media item created successfully",
      id: result._id,
      mediaItem: result,
    })
  } catch (error) {
    console.error("Error creating media item:", error)
    return NextResponse.json({ error: "Failed to create media item" }, { status: 500 })
  }
}