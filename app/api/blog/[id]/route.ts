import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { getPostById, updatePost, deletePost } from "@/lib/models/blog"
import { verifyAuth } from "@/lib/auth"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const formData = await request.formData()

    // Extract form fields
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const tags = formData.get("tags") as string
    const author = formData.get("author") as string
    const featured = formData.get("featured") === "true"
    const published = formData.get("published") === "true"
    const coverImageFile = formData.get("coverImage") as File | null
    const existingCoverImage = formData.get("existingCoverImage") as string

    // Basic validation
    if (!title || !content || !author || !category) {
      return NextResponse.json({ error: "Title, content, author, and category are required" }, { status: 400 })
    }

    let coverImageUrl = existingCoverImage || ""

    // Handle new image upload if provided
    if (coverImageFile && coverImageFile.size > 0) {
      try {
        // Convert file to buffer
        const bytes = await coverImageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "blog-images",
                transformation: [
                  { width: 1200, height: 630, crop: "fill" },
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

        coverImageUrl = (uploadResponse as any).secure_url

        // Optionally delete old image from Cloudinary if it exists
        if (existingCoverImage && existingCoverImage.includes("cloudinary.com")) {
          try {
            const publicId = existingCoverImage.split("/").pop()?.split(".")[0]
            if (publicId) {
              await cloudinary.uploader.destroy(`blog-images/${publicId}`)
            }
          } catch (deleteError) {
            console.log("Could not delete old image:", deleteError)
          }
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }
    }

    // Prepare update data
    const updateData = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      coverImage: coverImageUrl,
      author,
      featured,
      published,
      updatedAt: new Date(),
    }

    const result = await updatePost(id, updateData)

    if (!result) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { id } = await params

    // Get the post first to delete the image from Cloudinary
    const post = await getPostById(id)

    if (post && post.coverImage && post.coverImage.includes("cloudinary.com")) {
      try {
        const publicId = post.coverImage.split("/").pop()?.split(".")[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`blog-images/${publicId}`)
        }
      } catch (deleteError) {
        console.log("Could not delete image from Cloudinary:", deleteError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
