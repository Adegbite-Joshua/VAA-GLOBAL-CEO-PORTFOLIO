import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Experience, { type IExperience } from "@/lib/models/experience"

interface ExperienceResponse {
  _id: string
  year: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

interface ExperienceCreateRequest {
  year: string
  title: string
  description: string
}

// GET - Fetch all experiences
export async function GET(): Promise<NextResponse> {
  try {
    // await connectDB()

    const experiences: IExperience[] = await Experience.find({}).sort({ createdAt: -1 }).lean()

    const formattedExperiences: ExperienceResponse[] = experiences.map((exp) => ({
      _id: exp._id.toString(),
      year: exp.year,
      title: exp.title,
      description: exp.description,
      createdAt: exp.createdAt.toISOString(),
      updatedAt: exp.updatedAt.toISOString(),
    }))

    return NextResponse.json({data: formattedExperiences})
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

// POST - Create new experience
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // await connectDB()

    const body: ExperienceCreateRequest = await request.json()
    const { year, title, description } = body

    // Validation
    if (!year || !title || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (typeof year !== "string" || typeof title !== "string" || typeof description !== "string") {
      return NextResponse.json({ error: "All fields must be strings" }, { status: 400 })
    }

    if (year.length > 50) {
      return NextResponse.json({ error: "Year cannot exceed 50 characters" }, { status: 400 })
    }

    if (title.length > 200) {
      return NextResponse.json({ error: "Title cannot exceed 200 characters" }, { status: 400 })
    }

    if (description.length > 1000) {
      return NextResponse.json({ error: "Description cannot exceed 1000 characters" }, { status: 400 })
    }

    const experience: IExperience = new Experience({
      year: year.trim(),
      title: title.trim(),
      description: description.trim(),
    })

    await experience.save()

    const formattedExperience: ExperienceResponse = {
      _id: experience._id.toString(),
      year: experience.year,
      title: experience.title,
      description: experience.description,
      createdAt: experience.createdAt.toISOString(),
      updatedAt: experience.updatedAt.toISOString(),
    }

    return NextResponse.json(formattedExperience, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: "Validation failed", message: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
