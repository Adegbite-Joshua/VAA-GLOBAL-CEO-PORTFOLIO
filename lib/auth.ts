import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "./mongoose"

export async function createAdminUser(userData: { name: string; email: string; password: string }) {
  try {
    await connectToDatabase()

    const User =
      mongoose.models.User ||
      mongoose.model(
        "User",
        new mongoose.Schema(
          {
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            role: { type: String, enum: ["admin", "user"], default: "user" },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
          },
          {
            timestamps: true,
          },
        ),
      )

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      throw new Error("Email already in use")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create admin user
    const adminUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: "admin",
    })

    const result = await adminUser.save()

    return {
      id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
    }
  } catch (error: any) {
    console.error("Error creating admin user:", error)
    throw new Error(error.message || "Failed to create admin user")
  }
}
