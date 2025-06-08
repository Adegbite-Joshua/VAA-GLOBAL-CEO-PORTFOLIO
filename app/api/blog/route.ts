// import { NextResponse } from "next/server"
import { getAllPosts, getFeaturedPosts, createPost } from "@/lib/models/blog"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let posts
    if (featured === "true") {
      posts = await getFeaturedPosts()
    } else {
      posts = await getAllPosts()
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// export async function POST(request: Request) {
//   try {
//     const data = await request.json()

//     // Basic validation
//     if (!data.title || !data.content || !data.author) {
//       return NextResponse.json({ error: "Title, content, and author are required" }, { status: 400 })
//     }

//     // Generate slug if not provided
//     if (!data.slug) {
//       data.slug = data.title
//         .toLowerCase()
//         .replace(/[^\w\s]/gi, "")
//         .replace(/\s+/g, "-")
//     }

//     // Set defaults for optional fields
//     const post = {
//       ...data,
//       date: data.date || new Date(),
//       published: data.published !== undefined ? data.published : true,
//       featured: data.featured || false,
//       tags: data.tags || [],
//     }

//     const result = await createPost(post)

//     return NextResponse.json({
//       success: true,
//       message: "Blog post created successfully",
//       id: result.insertedId,
//     })
//   } catch (error) {
//     console.error("Error creating blog post:", error)
//     return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
//   }
// }

import { type NextRequest } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
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

    // Basic validation
    if (!title || !content || !author || !category) {
      return NextResponse.json({ error: "Title, content, author, and category are required" }, { status: 400 })
    }

    let coverImageUrl = ""

    // Handle image upload if provided
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
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }
    }

    // Generate slug if not provided
    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

    // Prepare post data
    const post = {
      title,
      slug: finalSlug,
      excerpt,
      content,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      coverImage: coverImageUrl,
      author,
      featured,
      published,
      date: new Date(),
    }

    const result = await createPost(post)

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      id: result._id,
      post: result,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

