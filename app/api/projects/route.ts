import { NextResponse } from "next/server"
import { getAllProjects, getProjectsByCategory, createProject, Project } from "@/lib/models/project"
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

// export async function POST(request: Request) {
//   try {
//     // Verify authentication
//     const session = await verifyAuth()
//     if (!session || session.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const data = await request.json()

//     // Basic validation
//     if (!data.title || !data.description || !data.category) {
//       return NextResponse.json({ error: "Title, description, and category are required" }, { status: 400 })
//     }

//     // Generate slug if not provided
//     if (!data.slug) {
//       data.slug = data.title
//         .toLowerCase()
//         .replace(/[^\w\s]/gi, "")
//         .replace(/\s+/g, "-")
//     }

//     // Set defaults for optional fields
//     const project = {
//       ...data,
//       tags: data.tags || [],
//       metrics: data.metrics || [],
//       featured: data.featured || false,
//     }

//     const result = await createProject(project)

//     return NextResponse.json({
//       success: true,
//       message: "Project created successfully",
//       id: result._id,
//     })
//   } catch (error) {
//     console.error("Error creating project:", error)
//     return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
//   }
// }

// export async function POST(request: Request) {
//   try {
//     // Verify authentication
//     const session = await verifyAuth()
//     if (!session || session.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const formData = await request.formData()
    
//     // Extract form data
//     const title = formData.get("title") as string
//     const slug = formData.get("slug") as string
//     const description = formData.get("description") as string
//     const category = formData.get("category") as string;
//     const year = formData.get("year") as string
//     const tags = formData.get("tags") as string[]
//     const metrics = formData.get("client") as string[]
//     const featured = formData.get("featured") === "true"
//     const imageFile = formData.get("image") as File | null

//     // Basic validation
//     if (!title || !description || !category || !year) {
//       return NextResponse.json(
//         { error: "Title, description, category, and year are required" },
//         { status: 400 }
//       )
//     }

//     let imageUrl = ""

//     // Handle image upload if provided
//     if (imageFile && imageFile.size > 0) {
//       try {
//         // Convert file to buffer
//         const bytes = await imageFile.arrayBuffer()
//         const buffer = Buffer.from(bytes)

//         // Upload to Cloudinary
//         const uploadResponse = await new Promise((resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 resource_type: "image",
//                 folder: "project-images",
//                 transformation: [
//                   { width: 1200, height: 630, crop: "fill" },
//                   { quality: "auto" },
//                   { fetch_format: "auto" },
//                 ],
//               },
//               (error, result) => {
//                 if (error) reject(error)
//                 else resolve(result)
//               }
//             )
//             .end(buffer)
//         })

//         imageUrl = (uploadResponse as any).secure_url
//       } catch (uploadError) {
//         console.error("Error uploading image:", uploadError)
//         return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
//       }
//     } else {
//       return NextResponse.json({ error: "Project image is required" }, { status: 400 })
//     }

//     // Create project data
//     const project: Project = {
//       title,
//       slug,
//       description,
//       image: imageUrl,
//       category,
//       year,
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//       metrics: [], // Initialize empty metrics array
//       featured,
//       // client: client || undefined,
//     }

//     const result = await createProject(project)

//     return NextResponse.json({
//       success: true,
//       message: "Project created successfully",
//       id: result._id,
//     })
//   } catch (error) {
//     console.error("Error creating project:", error)
//     return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
//   }
// }

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await verifyAuth()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()

    // Extract form data
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const longDescription = formData.get("longDescription") as string
    const category = formData.get("category") as string
    const year = formData.get("year") as string
    const tagsJson = formData.get("tags") as string
    const metricsJson = formData.get("metrics") as string
    const featured = formData.get("featured") === "true"
    const imageFile = formData.get("image") as File | null

    // Parse JSON arrays
    let tags: string[] = []
    let metrics: string[] = []

    try {
      tags = tagsJson ? JSON.parse(tagsJson) : []
    } catch (error) {
      console.error("Error parsing tags:", error)
      tags = []
    }

    try {
      metrics = metricsJson ? JSON.parse(metricsJson) : []
    } catch (error) {
      console.error("Error parsing metrics:", error)
      metrics = []
    }

    // Basic validation
    if (!title || !description || !category) {
      return NextResponse.json({ error: "Title, description, and category are required" }, { status: 400 })
    }

    // Validate slug
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    let imageUrl = ""

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      try {
        // Convert file to buffer
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "project-images",
                transformation: [
                  { width: 1200, height: 800, crop: "fill" },
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

        imageUrl = (uploadResponse as any).secure_url
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }
    } else {
      return NextResponse.json({ error: "Project image is required" }, { status: 400 })
    }

    // Create project data
    const project: Project = {
      title,
      slug,
      description,
      longDescription,
      image: imageUrl,
      category,
      year: year || "",
      tags,
      metrics,
      featured,
    }

    const result = await createProject(project)

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      id: result._id,
      project: result,
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}