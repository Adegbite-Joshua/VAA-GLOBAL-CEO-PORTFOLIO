import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface Contact extends Document {
  name: string
  email: string
  subject: string
  message: string
  date: Date
  read: boolean
}

const ContactSchema = new Schema<Contact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
})

const Contact = mongoose.models.Contact || mongoose.model<Contact>("Contact", ContactSchema)

export async function getAllContacts() {
  await connectToDatabase()
  const contacts = await Contact.find().sort({ date: -1 })
  return JSON.parse(JSON.stringify(contacts))
}

export async function getContactById(id: string) {
  await connectToDatabase()
  const contact = await Contact.findById(id)
  return JSON.parse(JSON.stringify(contact))
}

export async function createContact(contact: Contact) {
  await connectToDatabase()
  const newContact = new Contact(contact)
  const result = await newContact.save()
  return result
}

export async function updateContact(id: string, contact: Partial<Contact>) {
  await connectToDatabase()
  const result = await Contact.findByIdAndUpdate(id, contact, { new: true })
  return result
}

export async function deleteContact(id: string) {
  await connectToDatabase()
  const result = await Contact.findByIdAndDelete(id)
  return result
}

export default Contact
