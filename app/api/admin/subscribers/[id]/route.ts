import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectToDatabase } from "@/lib/mongoose"
import Newsletter from "@/lib/models/newsletter"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const { email, active } = await request.json()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid subscriber ID" }, { status: 400 })
    }

    const updatedSubscriber = await Newsletter.findByIdAndUpdate(
      id,
      { email, active },
      { new: true, runValidators: true },
    )

    if (!updatedSubscriber) {
      return NextResponse.json({ success: false, message: "Subscriber not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber updated successfully",
      subscriber: updatedSubscriber,
    })
  } catch (error) {
    console.error("Error updating subscriber:", error)
    return NextResponse.json({ success: false, message: "Failed to update subscriber" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid subscriber ID" }, { status: 400 })
    }

    const deletedSubscriber = await Newsletter.findByIdAndDelete(id)

    if (!deletedSubscriber) {
      return NextResponse.json({ success: false, message: "Subscriber not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting subscriber:", error)
    return NextResponse.json({ success: false, message: "Failed to delete subscriber" }, { status: 500 })
  }
}
