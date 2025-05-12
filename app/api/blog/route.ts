import { NextResponse } from "next/server"
import { getAllPosts, getFeaturedPosts, createPost } from "@/lib/models/blog"
import { verifyAuth } from "@/lib/auth"

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

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Basic validation
    if (!data.title || !data.content || !data.author) {
      return NextResponse.json({ error: "Title, content, and author are required" }, { status: 400 })
    }

    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Set defaults for optional fields
    const post = {
      ...data,
      date: data.date || new Date(),
      published: data.published !== undefined ? data.published : true,
      featured: data.featured || false,
      tags: data.tags || [],
    }

    const result = await createPost(post)

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      id: result._id,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
