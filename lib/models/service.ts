import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface ServiceOption {
  title: string
  description: string
  price: string
}

export interface Service extends Document {
  title: string
  slug: string
  description: string
  image: string
  features: string[]
  options: ServiceOption[]
  featured?: boolean
}

const ServiceOptionSchema = new Schema<ServiceOption>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
})

const ServiceSchema = new Schema<Service>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  features: [{ type: String }],
  options: [ServiceOptionSchema],
  featured: { type: Boolean, default: false },
})

const Service = mongoose.models.Service || mongoose.model<Service>("Service", ServiceSchema)

export async function getAllServices() {
  await connectToDatabase()
  const services = await Service.find()
  return JSON.parse(JSON.stringify(services))
}

export async function getFeaturedServices() {
  await connectToDatabase()
  const services = await Service.find({ featured: true })
  return JSON.parse(JSON.stringify(services))
}

export async function getServiceBySlug(slug: string) {
  await connectToDatabase()
  const service = await Service.findOne({ slug })
  return JSON.parse(JSON.stringify(service))
}

export async function createService(service: Service) {
  await connectToDatabase()
  const newService = new Service(service)
  const result = await newService.save()
  return result
}

export async function updateService(id: string, service: Partial<Service>) {
  await connectToDatabase()
  const result = await Service.findByIdAndUpdate(id, service, { new: true })
  return result
}

export async function deleteService(id: string) {
  await connectToDatabase()
  const result = await Service.findByIdAndDelete(id)
  return result
}

export default Service
