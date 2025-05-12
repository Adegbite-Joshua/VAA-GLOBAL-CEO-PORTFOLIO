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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Upload, Plus, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ServiceOption {
  title: string
  description: string
  price: string
}

interface Service {
  _id?: string
  title: string
  description: string
  image: string
  features: string[]
  options: ServiceOption[]
  featured?: boolean
}

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [formData, setFormData] = useState<Service>({
    title: "",
    description: "",
    image: "",
    features: [],
    options: [],
    featured: false,
  })

  const [featureInput, setFeatureInput] = useState("")
  const [optionForm, setOptionForm] = useState({
    title: "",
    description: "",
    price: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Fetch service data
  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch(`/api/services/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch service")
        }
        const data = await response.json()
        setFormData(data)
      } catch (err) {
        console.error("Error fetching service:", err)
        setError("Failed to load service data")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchService()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOptionForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData((prev) => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
      setFeatureInput("")
    }
  }

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({ ...prev, features: prev.features.filter((f) => f !== feature) }))
  }

  const handleAddOption = () => {
    if (optionForm.title.trim() && optionForm.price.trim()) {
      setFormData((prev) => ({ ...prev, options: [...prev.options, { ...optionForm }] }))
      setOptionForm({
        title: "",
        description: "",
        price: "",
      })
    }
  }

  const handleRemoveOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
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
    if (!formData.title || !formData.description) {
      setError("Title and description are required")
      return
    }

    if (formData.features.length === 0) {
      setError("Please add at least one feature")
      return
    }

    if (formData.options.length === 0) {
      setError("Please add at least one service option")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update service")
      }

      router.push("/admin/services")
    } catch (err: any) {
      setError(err.message || "Failed to update service")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete service")
      }

      router.push("/admin/services")
    } catch (err: any) {
      setError(err.message || "Failed to delete service")
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading service data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/admin/services" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Update service details</p>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting} className="ml-auto">
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete Service"}
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
                  placeholder="Enter service title"
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
                  placeholder="Describe the service"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.features.map((feature, index) => (
                    <Badge
                      key={index}
                      className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="text-green-800 hover:text-green-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddFeature()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddFeature} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Service Options</Label>
                <div className="space-y-4">
                  {formData.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{option.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{option.price}</Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveOption(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="optionTitle">Option Title</Label>
                    <Input
                      id="optionTitle"
                      name="title"
                      value={optionForm.title}
                      onChange={handleOptionChange}
                      placeholder="e.g., Basic Package"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="optionDescription">Option Description</Label>
                    <Input
                      id="optionDescription"
                      name="description"
                      value={optionForm.description}
                      onChange={handleOptionChange}
                      placeholder="e.g., Four sessions per month"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="optionPrice">Price</Label>
                    <div className="flex gap-2">
                      <Input
                        id="optionPrice"
                        name="price"
                        value={optionForm.price}
                        onChange={handleOptionChange}
                        placeholder="e.g., $1,500/month"
                      />
                      <Button
                        type="button"
                        onClick={handleAddOption}
                        variant="outline"
                        className="whitespace-nowrap"
                        disabled={!optionForm.title || !optionForm.price}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Service Image</Label>
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
                <Label htmlFor="featured">Featured Service</Label>
              </div>

              <div className="flex justify-end gap-4">
                <Link href="/admin/services">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? "Updating..." : "Update Service"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
