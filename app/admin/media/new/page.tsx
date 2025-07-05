"use client"

import type React from "react"

import { useState } from "react"
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
import Api from "@/utils/api"

export default function NewMediaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    url: "",
    thumbnail: "",
    location: "",
    featured: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

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
      // In a real application, you would upload the file to your server or Cloudinary
      // For now, we'll simulate a delay and use a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful upload with a placeholder URL
      const imageUrl = `/placeholder.jpg?height=600&width=1200&text=${encodeURIComponent(file.name)}`
      setFormData((prev) => ({ ...prev, thumbnail: imageUrl }))
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.title || !formData.type || !formData.url) {
      setError("Title, type, and URL are required");
      return;
    }

    setLoading(true);

    try {
      const formDataForSubmit = new FormData();

      // Required fields
      formDataForSubmit.append("title", formData.title);
      formDataForSubmit.append("type", formData.type);
      formDataForSubmit.append("url", formData.url);
      formDataForSubmit.append("location", formData.location);
      formDataForSubmit.append("featured", formData.featured.toString());

      // Optional fields
      if (formData.description) {
        formDataForSubmit.append("description", formData.description);
      }

      // Handle file upload - only on client side
      if (typeof window !== "undefined") {
        const fileInput = document.getElementById("image-upload") as HTMLInputElement;
        if (fileInput?.files?.[0]) {
          formDataForSubmit.append("thumbnail", fileInput.files[0]);
        }
      }

      // Make API request with Axios
      const { data } = await Api.post("/api/media", formDataForSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect to media list on success
      router.push("/admin/media");
    } catch (err: any) {
      // Axios error handling
      const errorMessage = err.response?.data?.error ||
        err.message ||
        "Failed to create media item";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div>
      <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/admin/media" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Media</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new media item</p>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the media"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Media Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="image">Image</SelectItem> */}
                      <SelectItem value="video">Video</SelectItem>
                      {/* <SelectItem value="document">Document</SelectItem> */}
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Media URL</Label>
                  <Input
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="URL to the media file"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Lagos, Nigeria"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    disabled={imageUploading}
                    className="relative"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {imageUploading ? "Uploading..." : "Upload Thumbnail"}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Button>
                  {formData.thumbnail && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Thumbnail uploaded successfully</p>
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

              <div className="flex justify-end">
                <Button type="submit" disabled={loading || imageUploading} className="w-full sm:w-auto">
                  {loading ? "Creating..." : "Create Media"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
