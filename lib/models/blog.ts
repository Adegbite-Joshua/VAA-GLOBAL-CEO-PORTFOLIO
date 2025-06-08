import mongoose, { Schema, type Document } from "mongoose"
import { connectToDatabase } from "../mongoose"

export interface BlogPost extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  coverImage: string
  date: Date
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
}

const BlogSchema = new Schema<BlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String, required: true },
  date: { type: Date, default: Date.now },
  readTime: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
})

// This is important to avoid model redefinition errors
const Blog = mongoose.models.Blog || mongoose.model<BlogPost>("Blog", BlogSchema)

export async function getAllPosts() {
  await connectToDatabase()
  const posts = await Blog.find({ published: true }).sort({ date: -1 })
  return JSON.parse(JSON.stringify(posts))
}

export async function getFeaturedPosts() {
  await connectToDatabase()
  const posts = await Blog.find({ published: true, featured: true }).sort({ date: -1 }).limit(3)
  return JSON.parse(JSON.stringify(posts))
}

export async function getPostBySlug(slug: string) {
  await connectToDatabase()
  const post = await Blog.findOne({ slug, published: true })
  return JSON.parse(JSON.stringify(post))
}

export async function getPostById(id: string) {
  await connectToDatabase()
  const post = await Blog.findById(id)
  return JSON.parse(JSON.stringify(post))
}

export async function getPostsByCategory(category: string) {
  await connectToDatabase()
  const posts = await Blog.find({ published: true, category }).sort({ date: -1 })
  return JSON.parse(JSON.stringify(posts))
}

export async function createPost(post: BlogPost) {
  await connectToDatabase()
  const newPost = new Blog(post)
  const result = await newPost.save()
  return result
}

export async function updatePost(id: string, post: Partial<BlogPost>) {
  await connectToDatabase()
  const result = await Blog.findByIdAndUpdate(id, post, { new: true })
  return result
}

export async function deletePost(id: string) {
  await connectToDatabase()
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export default Blog
