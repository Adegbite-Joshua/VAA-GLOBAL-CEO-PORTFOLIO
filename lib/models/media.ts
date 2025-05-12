import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface MediaItem extends Document {
  title: string
  slug: string
  description: string
  image: string
  type: "video" | "podcast" | "article"
  date: Date
  location: string
  link: string
  featured: boolean
}

const MediaSchema = new Schema<MediaItem>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ["video", "podcast", "article"], required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  link: { type: String, required: true },
  featured: { type: Boolean, default: false },
})

const Media = mongoose.models.Media || mongoose.model<MediaItem>("Media", MediaSchema)

export async function getAllMediaItems() {
  await connectToDatabase()
  const mediaItems = await Media.find().sort({ date: -1 })
  return JSON.parse(JSON.stringify(mediaItems))
}

export async function getMediaItemsByType(type: "video" | "podcast" | "article") {
  await connectToDatabase()
  const mediaItems = await Media.find({ type }).sort({ date: -1 })
  return JSON.parse(JSON.stringify(mediaItems))
}

export async function getFeaturedMediaItems() {
  await connectToDatabase()
  const mediaItems = await Media.find({ featured: true }).sort({ date: -1 }).limit(3)
  return JSON.parse(JSON.stringify(mediaItems))
}

export async function getMediaItemBySlug(slug: string) {
  await connectToDatabase()
  const mediaItem = await Media.findOne({ slug })
  return JSON.parse(JSON.stringify(mediaItem))
}

export async function createMediaItem(mediaItem: MediaItem) {
  await connectToDatabase()
  const newMediaItem = new Media(mediaItem)
  const result = await newMediaItem.save()
  return result
}

export async function updateMediaItem(id: string, mediaItem: Partial<MediaItem>) {
  await connectToDatabase()
  const result = await Media.findByIdAndUpdate(id, mediaItem, { new: true })
  return result
}

export async function deleteMediaItem(id: string) {
  await connectToDatabase()
  const result = await Media.findByIdAndDelete(id)
  return result
}

export default Media
