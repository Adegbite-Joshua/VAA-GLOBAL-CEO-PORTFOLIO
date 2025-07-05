import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface Settings extends Document {
  siteName: string
  tagline: string
  description: string
  contactEmail: string
  contactPhone: string
  address: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    facebook?: string
    instagram?: string
  }
  updatedAt: Date
}

const SocialLinksSchema = new Schema({
  twitter: { type: String },
  linkedin: { type: String },
  facebook: { type: String },
  instagram: { type: String },
})

const SettingsSchema = new Schema<Settings>({
  siteName: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  address: { type: String },
  socialLinks: SocialLinksSchema,
  updatedAt: { type: Date, default: Date.now },
})

const Settings = mongoose.models.Settings || mongoose.model<Settings>("Settings", SettingsSchema)

export async function getSettings() {
  await connectToDatabase()
  // Always return the first settings document
  let settings = await Settings.findOne()

  // If no settings exist, create default settings
  if (!settings) {
    settings = await Settings.create({
      siteName: "Tosin Ayodeji Emmanuel",
      tagline: "Leadership & Strategy",
      description: "Executive leadership portfolio showcasing experience and expertise.",
      contactEmail: "contact@example.com",
      contactPhone: "",
      address: "",
      socialLinks: {},
      updatedAt: new Date(),
    })
  }

  return JSON.parse(JSON.stringify(settings))
}

export async function updateSettings(settings: Partial<Settings>) {
  await connectToDatabase()

  // Find the first settings document
  const existingSettings = await Settings.findOne()

  if (existingSettings) {
    // Update existing settings
    const result = await Settings.findByIdAndUpdate(
      existingSettings._id,
      { ...settings, updatedAt: new Date() },
      { new: true },
    )
    return result
  } else {
    // Create new settings if none exist
    const newSettings = new Settings({
      ...settings,
      updatedAt: new Date(),
    })
    const result = await newSettings.save()
    return result
  }
}

export default Settings
