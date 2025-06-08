import { NextResponse } from "next/server"
import { getAllProjects, getProjectsByCategory, createProject } from "@/lib/models/project"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") as "current" | "past" | null

    let projects
    if (category) {
      projects = await getProjectsByCategory(category)
    } else {
      projects = await getAllProjects()
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
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
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json({ error: "Title, description, and category are required" }, { status: 400 })
    }

    // Generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Set defaults for optional fields
    const project = {
      ...data,
      tags: data.tags || [],
      metrics: data.metrics || [],
      featured: data.featured || false,
    }

    const result = await createProject(project)

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      id: result._id,
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
