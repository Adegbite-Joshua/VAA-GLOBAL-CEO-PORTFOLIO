"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
// import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import dynamic from "next/dynamic"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  author: string
  readTime: string
  featured: boolean
  published: boolean
  date: string
}

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false, // This is the key!
  loading: () => <div>Loading editor...</div>
})

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [formData, setFormData] = useState<BlogPost>({
    _id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    coverImage: "",
    author: "",
    readTime: "",
    featured: false,
    published: true,
    date: new Date().toISOString(),
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [imageUploading, setImageUploading] = useState(false)


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }

        const post = await response.json()

        setFormData({
          ...post.post,
          tags: post.post.tags?.join(", ") || "",
        })
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setError("Failed to load blog post. Please try again.")
      } finally {
        setFetchLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])
  console.log("formData", formData);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title if slug is empty
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)

    try {
      // Create a FormData object to send the file
      const formData = new FormData()
      formData.append("file", file)

      // Upload to Cloudinary via your API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, coverImage: data.url }))
      setSuccess("Image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate form
    if (!formData.title || !formData.content || !formData.category) {
      setError("Title, content, and category are required")
      return
    }

    setLoading(true)

    try {
      // Prepare tags as an array
      const tagsArray =
        typeof formData.tags === "string"
          ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
          : formData.tags

      // Prepare the post data
      const postData = {
        ...formData,
        tags: tagsArray,
      }

      // Submit to API
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update blog post")
      }

      setSuccess("Blog post updated successfully!")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/blog")
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Failed to update blog post")
    } finally {
      setLoading(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Categories (in a real app, these would come from your database)
  const categories = [
    "Leadership",
    "Team Development",
    "Future of Work",
    "Sustainability",
    "Global Leadership",
    "Technology",
    "Career Development",
  ]

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading post data...</p>
      </div>
    )
  }

  return (
    <div>
      <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/admin/blog" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Blog Post</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Update your blog post</p>
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Card>
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-orange-50 text-green-800 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="post-url-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary of the post"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className="min-h-[300px] border rounded-md">
                  {mounted && (
                    <ReactQuill
                      value={formData.content}
                      onChange={handleEditorChange}
                      placeholder="Write your post content here..."
                      className="h-64"
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ indent: "-1" }, { indent: "+1" }],
                          [{ align: [] }],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={typeof formData.tags === "string" ? formData.tags : formData.tags.join(", ")}
                    onChange={handleChange}
                    placeholder="Comma separated tags"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g., 5 min read"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    disabled={imageUploading}
                    className="relative"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {imageUploading ? "Uploading..." : "Upload Image"}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Button>
                  {formData.coverImage && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Image uploaded successfully</p>
                  )}
                </div>
                {formData.coverImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
                    <img
                      src={formData.coverImage || "/placeholder.jpg"}
                      alt="Cover preview"
                      className="h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => handleCheckboxChange("published", checked as boolean)}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading || imageUploading}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loading ? "Updating..." : "Update Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
