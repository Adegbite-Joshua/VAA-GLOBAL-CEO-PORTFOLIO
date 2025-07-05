import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface Project extends Document {
  title: string
  slug: string
  description: string
  longDescription?: string
  image: string
  category: string
  year: string
  tags: string[]
  metrics: string[]
  featured: boolean
}

const ProjectSchema = new Schema<Project>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  image: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: String, required: true },
  tags: [{ type: String }],
  metrics: [{ type: String }],
  featured: { type: Boolean, default: false },
})

const Project = mongoose.models.Project || mongoose.model<Project>("Project", ProjectSchema)

export async function getAllProjects() {
  await connectToDatabase()
  const projects = await Project.find().sort({ year: -1 })
  return JSON.parse(JSON.stringify(projects))
}

export async function getProjectsByCategory(category: string) {
  await connectToDatabase()
  const projects = await Project.find({ category }).sort({ year: -1 })
  return JSON.parse(JSON.stringify(projects))
}

export async function getProjectBySlug(slug: string) {
  await connectToDatabase()
  const project = await Project.findOne({ slug })
  return JSON.parse(JSON.stringify(project))
}

export async function createProject(project: Project) {
  await connectToDatabase()
  const newProject = new Project(project)
  const result = await newProject.save()
  return result
}

export async function updateProject(id: string, project: Partial<Project>) {
  await connectToDatabase()
  const result = await Project.findByIdAndUpdate(id, project, { new: true })
  return result
}

export async function deleteProject(id: string) {
  await connectToDatabase()
  const result = await Project.findByIdAndDelete(id)
  return result
}

export default Project
