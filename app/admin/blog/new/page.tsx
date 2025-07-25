"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { AlertCircle, ArrowLeft, Upload } from 'lucide-react'
import Link from "next/link"
// import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import Api from "@/utils/api"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false, // This is the key!
  loading: () => <div>Loading editor...</div>
})

export default function NewBlogPostPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    readTime: "",
    coverImage: "",
    author: "Tosin Ayodeji",
    featured: false,
    published: true,
  })

  const modules = {
    // toolbar what tools appear in the UI
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "color",
    "background",
    "italic",
    "underline",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "align",
    "size",
    "link",
    "image",
  ];


  useEffect(() => {
    setMounted(true)
  }, [])

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title") {
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
      // In a real application, you would upload the file to your server or Cloudinary
      // For now, we'll simulate a delay and use a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful upload with a placeholder URL
      const imageUrl = `/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(file.name)}`
      setFormData((prev) => ({ ...prev, coverImage: imageUrl }))
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setImageUploading(false)
    }
  }

  const createBlogPost = async (formDataForSubmit: FormData) => {
    try {
      const response = await Api.post('/api/blog', formDataForSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for FormData
        },
      });

      console.log("response", response);
      
      return response.post;
    } catch (error) {
      console.log(error);
      
      if (axios.isAxiosError(error)) {
        // Type-safe error handling
        const errorMessage = error.response?.data?.error || 'Failed to create blog post';
        throw new Error(errorMessage);
      }
      throw error; // Re-throw non-Axios errors
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.title || !formData.content || !formData.category) {
      setError("Title, content, and category are required")
      return
    }

    setLoading(true)

    try {
      const formDataForSubmit = new FormData()
      formDataForSubmit.append("title", formData.title)
      formDataForSubmit.append("slug", formData.slug)
      formDataForSubmit.append("excerpt", formData.excerpt)
      formDataForSubmit.append("content", formData.content)
      formDataForSubmit.append("category", formData.category)
      formDataForSubmit.append("tags", formData.tags)
      formDataForSubmit.append("author", formData.author)
      formDataForSubmit.append("readTime", formData.readTime)
      formDataForSubmit.append("featured", formData.featured.toString())
      formDataForSubmit.append("published", formData.published.toString())

      // Handle file upload
      // const fileInput = document.getElementById("image-upload") as HTMLInputElement
      // if (fileInput?.files?.[0]) {
      //   formDataForSubmit.append("coverImage", fileInput.files[0])
      // }

      // Handle file upload - only on client side
      if (typeof window !== "undefined") {
        const fileInput = document.getElementById("image-upload") as HTMLInputElement
        if (fileInput?.files?.[0]) {
          formDataForSubmit.append("coverImage", fileInput.files[0])
        }
      }

      const result = await createBlogPost(formDataForSubmit);
      console.log(result);
      

      router.push(`/admin/blog`)
    } catch (err: any) {
      console.log(err);
      
      setError(err.message || "Failed to create blog post")
    } finally {
      setLoading(false)
    }
  }

  const handleImageButtonClick = () => {
    if (mounted) {
      console.log(typeof window);

      if (typeof window !== "undefined") {
        document.getElementById("image-upload")?.click()
      }
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

  return (
    <div className="h-auto overflow-auto">
      <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/admin/blog" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Blog Post</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new blog post</p>
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="h-auto overflow-auto">
        <Card>
          <CardContent className="pt-6 overflow-auto h-auto">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
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
                <Label htmlFor="content">Content</Label>
                <div className="min-h-[300px]">
                  {mounted ?
                    <ReactQuill
                      value={formData.content}
                      onChange={handleEditorChange}
                      placeholder="Write your post content here..."
                      className="h-64 bg-white dark:bg-gray-900"
                      theme="snow"
                      modules={modules}
                      formats={formats}
                    /> : <div>Loading editor...</div>
                  }
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
                    value={formData.tags}
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
                <Label htmlFor="coverImage">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageButtonClick}
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
                <Button type="submit" disabled={loading || imageUploading} className="w-full sm:w-auto">
                  {loading ? "Creating..." : "Create Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
