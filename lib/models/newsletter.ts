import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface Newsletter extends Document {
  email: string
  date: Date
  active: boolean
}

const NewsletterSchema = new Schema<Newsletter>({
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
})

const Newsletter = mongoose.models.Newsletter || mongoose.model<Newsletter>("Newsletter", NewsletterSchema)

export async function getAllSubscribers() {
  await connectToDatabase()
  const subscribers = await Newsletter.find().sort({ date: -1 })
  return JSON.parse(JSON.stringify(subscribers))
}

export async function getActiveSubscribers() {
  await connectToDatabase()
  const subscribers = await Newsletter.find({ active: true }).sort({ date: -1 })
  return JSON.parse(JSON.stringify(subscribers))
}

export async function subscribeEmail(email: string) {
  await connectToDatabase()

  // Check if email already exists
  const existingSubscriber = await Newsletter.findOne({ email })

  if (existingSubscriber) {
    // If inactive, reactivate
    if (!existingSubscriber.active) {
      existingSubscriber.active = true
      await existingSubscriber.save()
      return { success: true, message: "Subscription reactivated" }
    }
    return { success: true, message: "Already subscribed" }
  }

  // Create new subscriber
  const newSubscriber = new Newsletter({ email, date: new Date(), active: true })
  await newSubscriber.save()

  return { success: true, message: "Successfully subscribed" }
}

export async function unsubscribeEmail(email: string) {
  await connectToDatabase()
  const result = await Newsletter.findOneAndUpdate({ email }, { active: false }, { new: true })
  return result
}

export default Newsletter
