import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Experience, { type IExperience } from "@/lib/models/experience"
import mongoose from "mongoose"
import connectToDatabase from "@/lib/mongoose"

interface ExperienceResponse {
  _id: string
  year: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

interface ExperienceUpdateRequest {
  year: string
  title: string
  description: string
}

interface RouteParams {
  params: {
    id: string
  }
}

// GET - Fetch single experience
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    await connectToDatabase()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid experience ID" }, { status: 400 })
    }

    const experience: IExperience | null = await Experience.findById(id).lean()

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    const formattedExperience: ExperienceResponse = {
      _id: experience._id.toString(),
      year: experience.year,
      title: experience.title,
      description: experience.description,
      createdAt: experience.createdAt.toISOString(),
      updatedAt: experience.updatedAt.toISOString(),
    }

    return NextResponse.json(formattedExperience)
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 })
  }
}

// PUT - Update experience
export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    await connectToDatabase()

    const { id } = params
    const body: ExperienceUpdateRequest = await request.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid experience ID" }, { status: 400 })
    }

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

    const experience: IExperience | null = await Experience.findByIdAndUpdate(
      id,
      {
        year: year.trim(),
        title: title.trim(),
        description: description.trim(),
      },
      { new: true, runValidators: true },
    ).lean()

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    const formattedExperience: ExperienceResponse = {
      _id: experience._id.toString(),
      year: experience.year,
      title: experience.title,
      description: experience.description,
      createdAt: experience.createdAt.toISOString(),
      updatedAt: experience.updatedAt.toISOString(),
    }

    return NextResponse.json(formattedExperience)
  } catch (error) {
    console.error("Error updating experience:", error)

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: "Validation failed", message: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

// DELETE - Delete experience
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    await connectToDatabase()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid experience ID" }, { status: 400 })
    }

    const experience: IExperience | null = await Experience.findByIdAndDelete(id)

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Experience deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}



