import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "@/lib/mongoose"

interface INewsletter extends Document {
  email: string
  date: Date
  active: boolean
}

const NewsletterSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
})

const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletter>("Newsletter", NewsletterSchema)

async function subscribeEmail(email: string) {
  try {
    await connectToDatabase()

    const existingSubscriber = await Newsletter.findOne({ email })

    if (existingSubscriber) {
      return { success: false, message: "Email already subscribed" }
    }

    const newSubscriber = new Newsletter({ email })
    await newSubscriber.save()

    return { success: true, message: "Email subscribed successfully" }
  } catch (error: any) {
    console.error("Error subscribing email:", error)
    return { success: false, message: error.message || "Failed to subscribe email" }
  }
}

async function getAllSubscribers() {
  try {
    await connectToDatabase()
    const subscribers = await Newsletter.find({})
    return subscribers
  } catch (error) {
    console.error("Error getting all subscribers:", error)
    return []
  }
}

async function getActiveSubscribers() {
  try {
    await connectToDatabase()
    const subscribers = await Newsletter.find({ active: true })
    return subscribers
  } catch (error) {
    console.error("Error getting active subscribers:", error)
    return []
  }
}

async function unsubscribeEmail(email: string) {
  try {
    await connectToDatabase()
    const result = await Newsletter.findOneAndUpdate({ email }, { active: false }, { new: true })
    return result !== null
  } catch (error) {
    console.error("Error unsubscribing email:", error)
    return false
  }
}

export { getAllSubscribers, getActiveSubscribers, subscribeEmail, unsubscribeEmail }
export default Newsletter
