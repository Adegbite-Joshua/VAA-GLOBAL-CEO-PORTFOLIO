import mongoose, { Schema, type Document } from "mongoose"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "../mongoose"

export interface User extends Document {
  name: string
  email: string
  password: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<User>(
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
)

// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.models.User || mongoose.model<User>("User", UserSchema)

export async function getUserByEmail(email: string) {
  await connectToDatabase()
  const user = await User.findOne({ email })
  return user
}

export async function getUserById(id: string) {
  await connectToDatabase()
  const user = await User.findById(id)
  return user
}

export async function createUser(userData: Partial<User>) {
  await connectToDatabase()
  const newUser = new User(userData)
  const result = await newUser.save()
  return result
}

export async function updateUser(id: string, userData: Partial<User>) {
  await connectToDatabase()
  const result = await User.findByIdAndUpdate(id, userData, { new: true })
  return result
}

export default User
