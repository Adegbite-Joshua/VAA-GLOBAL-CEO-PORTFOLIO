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
import { AlertCircle, ArrowLeft, Upload, Trash2 } from "lucide-react"
import Link from "next/link"
import type { MediaItem } from "@/lib/models/media"

export default function EditMediaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [formData, setFormData] = useState<MediaItem>({
    title: "",
    slug: "",
    description: "",
    image: "",
    type: "video",
    date: new Date(),
    location: "",
    link: "",
    featured: false,
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Fetch media data
  useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch(`/api/media/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch media item")
        }
        const data = await response.json()

        // Format date for input field
        if (data.date) {
          const date = new Date(data.date)
          data.formattedDate = date.toISOString().split("T")[0]
        }

        setFormData(data)
      } catch (err) {
        console.error("Error fetching media item:", err)
        setError("Failed to load media data")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchMedia()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image: data.url }))
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

    // Validate form
    if (!formData.title || !formData.description || !formData.type || !formData.link) {
      setError("Title, description, type, and link are required")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update media item")
      }

      router.push("/admin/media")
    } catch (err: any) {
      setError(err.message || "Failed to update media item")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this media item? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete media item")
      }

      router.push("/admin/media")
    } catch (err: any) {
      setError(err.message || "Failed to delete media item")
      setIsDeleting(false)
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

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading media data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/admin/media" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Media</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Update media details</p>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting} className="ml-auto">
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete Media"}
        </Button>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter media title"
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
                  placeholder="media-url-slug"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the media"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Media Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value as "video" | "podcast" | "article")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="formattedDate"
                    type="date"
                    value={formData.formattedDate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., CNN, Forbes, TED Talk"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="URL to the media"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Media Image</Label>
                {formData.image && (
                  <div className="mb-2">
                    <img
                      src={formData.image || "/placeholder.jpg"}
                      alt={formData.title}
                      className="h-40 object-cover rounded-md"
                    />
                  </div>
                )}
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
                  {formData.image && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Image uploaded successfully</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
                />
                <Label htmlFor="featured">Featured Media</Label>
              </div>

              <div className="flex justify-end gap-4">
                <Link href="/admin/media">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Updating..." : "Update Media"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
