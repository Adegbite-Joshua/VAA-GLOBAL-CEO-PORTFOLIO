// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle, ArrowLeft, Upload } from "lucide-react"
// import Link from "next/link"
// import Api from "@/utils/api"

// export default function NewProjectPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     client: "",
//     category: "",
//     technologies: "",
//     completionDate: "",
//     coverImage: "",
//     gallery: [],
//     featured: false,
//   })
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [imageUploading, setImageUploading] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))

//     // Auto-generate slug from title
//     if (name === "title") {
//       const slug = value
//         .toLowerCase()
//         .replace(/[^\w\s]/gi, "")
//         .replace(/\s+/g, "-")
//       setFormData((prev) => ({ ...prev, slug }))
//     }
//   }

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleCheckboxChange = (name: string, checked: boolean) => {
//     setFormData((prev) => ({ ...prev, [name]: checked }))
//   }

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     setImageUploading(true)

//     try {
//       // In a real application, you would upload the file to your server or Cloudinary
//       // For now, we'll simulate a delay and use a placeholder
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // Simulate a successful upload with a placeholder URL
//       const imageUrl = `/placeholder.jpg?height=600&width=1200&text=${encodeURIComponent(file.name)}`
//       setFormData((prev) => ({ ...prev, coverImage: imageUrl }))
//     } catch (error) {
//       console.error("Error uploading image:", error)
//       setError("Failed to upload image. Please try again.")
//     } finally {
//       setImageUploading(false)
//     }
//   }

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault()
//   //   setError("")

//   //   // Validate form
//   //   if (!formData.title || !formData.description || !formData.category) {
//   //     setError("Title, description, and category are required")
//   //     return
//   //   }

//   //   console.log(formData);

//   //   setLoading(true);

//   //   try {
//   //     await new Promise((resolve) => setTimeout(resolve, 1500))

//   //     // Redirect to projects list
//   //     router.push("/admin/projects")
//   //   } catch (err: any) {
//   //     setError(err.message || "Failed to create project")
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     // Validate required fields
//     if (!formData.title || !formData.description || !formData.category) {
//       setError("Title, description, and category are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataForSubmit = new FormData();

//       // Required fields
//       formDataForSubmit.append("title", formData.title);
//       formDataForSubmit.append("slug", formData.slug || generateSlug(formData.title));
//       formDataForSubmit.append("description", formData.description);
//       formDataForSubmit.append("category", formData.category);

//       if (formData.client) {
//         formDataForSubmit.append("client", formData.client);
//       }
//       if (formData.technologies) {
//         formDataForSubmit.append("tags", formData.technologies);
//       }
//       if (formData.completionDate) {
//         formDataForSubmit.append("year", new Date(formData.completionDate).getFullYear().toString());
//       }
//       formDataForSubmit.append("featured", formData.featured.toString());

//       // Handle file upload - only on client side
//       if (typeof window !== "undefined") {
//         const fileInput = document.getElementById("image-upload") as HTMLInputElement;
//         if (fileInput?.files?.[0]) {
//           formDataForSubmit.append("image", fileInput.files[0]);
//         }
//       }

//       // Axios request with progress tracking if needed
//       const response = await Api.post('/api/projects', formDataForSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         // onUploadProgress: (progressEvent) => {
//         //   const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         //   console.log(percentCompleted);
//         //   // You could set upload progress state here if you want to show a progress bar
//         // },
//       });

//       // Redirect to projects list
//       router.push("/admin/projects");
//     } catch (err: any) {
//       // Axios error handling
//       const errorMessage = err.response?.data?.error || err.message || "Failed to create project";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to generate slug if not provided
//   const generateSlug = (title: string) => {
//     return title
//       .toLowerCase()
//       .replace(/[^\w\s]/gi, "")
//       .replace(/\s+/g, "-");
//   };

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   }

//   // Categories (in a real app, these would come from your database)
//   const categories = [
//     "Web Development",
//     "Mobile App",
//     "Branding",
//     "UI/UX Design",
//     "Consulting",
//     "Digital Transformation",
//     "Enterprise Solution",
//   ]

//   return (
//     <div>
//       <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
//         <Link href="/admin/projects" className="mr-4">
//           <Button variant="ghost" size="icon">
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Project</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new project to your portfolio</p>
//         </div>
//       </motion.div>

//       <motion.div initial="hidden" animate="visible" variants={fadeIn}>
//         <Card>
//           <CardContent className="pt-6">
//             {error && (
//               <Alert variant="destructive" className="mb-6">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Project Title</Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Enter project title"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="slug">Slug</Label>
//                   <Input
//                     id="slug"
//                     name="slug"
//                     value={formData.slug}
//                     onChange={handleChange}
//                     placeholder="project-url-slug"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Detailed description of the project"
//                   rows={5}
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="client">Client</Label>
//                   <Input
//                     id="client"
//                     name="client"
//                     value={formData.client}
//                     onChange={handleChange}
//                     placeholder="Client name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="category">Category</Label>
//                   <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category} value={category}>
//                           {category}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="technologies">Technologies</Label>
//                   <Input
//                     id="technologies"
//                     name="technologies"
//                     value={formData.technologies}
//                     onChange={handleChange}
//                     placeholder="Comma separated technologies"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="completionDate">Completion Date</Label>
//                   <Input
//                     id="completionDate"
//                     name="completionDate"
//                     type="date"
//                     value={formData.completionDate}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="coverImage">Cover Image</Label>
//                 <div className="flex items-center gap-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => document.getElementById("image-upload")?.click()}
//                     disabled={imageUploading}
//                     className="relative"
//                   >
//                     <Upload className="h-4 w-4 mr-2" />
//                     {imageUploading ? "Uploading..." : "Upload Image"}
//                     <input
//                       id="image-upload"
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                     />
//                   </Button>
//                   {formData.coverImage && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Image uploaded successfully</p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="featured"
//                   checked={formData.featured}
//                   onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
//                 />
//                 <Label htmlFor="featured">Featured Project</Label>
//               </div>

//               <div className="flex justify-end">
//                 <Button type="submit" disabled={loading || imageUploading} className="w-full sm:w-auto">
//                   {loading ? "Creating..." : "Create Project"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   )
// }






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
import { AlertCircle, ArrowLeft, Upload, Plus, X } from "lucide-react"
import Link from "next/link"
import Api from "@/utils/api"

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    year: "",
    category: "",
    tags: [],
    metrics: [],
    image: "",
    featured: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [newMetric, setNewMetric] = useState("")

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("");
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleAddMetric = () => {
    if (newMetric.trim() && !formData.metrics.includes(newMetric.trim())) {
      setFormData((prev) => ({
        ...prev,
        metrics: [...prev.metrics, newMetric.trim()],
      }))
      setNewMetric("")
    }
  }

  const handleRemoveMetric = (metricToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((metric) => metric !== metricToRemove),
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      // In a real application, you would upload the file to your server or cloud storage
      // For now, we'll simulate a delay and use a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Simulate a successful upload with a placeholder URL
      const imageUrl = `/placeholder.jpg?height=800&width=1200&text=${encodeURIComponent(file.name)}`
      setFormData((prev) => ({ ...prev, image: imageUrl }))
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

    // Validate required fields
    if (!formData.title || !formData.description || !formData.category) {
      setError("Title, description, and category are required")
      return
    }

    setLoading(true)
    try {
      const formDataForSubmit = new FormData()

      // Required fields
      formDataForSubmit.append("title", formData.title)
      formDataForSubmit.append("slug", formData.slug || generateSlug(formData.title))
      formDataForSubmit.append("description", formData.description)
      formDataForSubmit.append("longDescription", formData.longDescription)
      formDataForSubmit.append("category", formData.category)

      if (formData.year) {
        formDataForSubmit.append("year", formData.year)
      }

      // Convert arrays to JSON strings
      formDataForSubmit.append("tags", JSON.stringify(formData.tags))
      formDataForSubmit.append("metrics", JSON.stringify(formData.metrics))
      formDataForSubmit.append("featured", formData.featured.toString())

      // Handle file upload - only on client side
      if (typeof window !== "undefined") {
        const fileInput = document.getElementById("image-upload") as HTMLInputElement
        if (fileInput?.files?.[0]) {
          formDataForSubmit.append("image", fileInput.files[0])
        }
      }

      // API request
      const response = await Api.post("/api/projects", formDataForSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Redirect to projects list
      router.push("/admin/projects")
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Failed to create project"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to generate slug if not provided
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Categories
  const categories = [
    "current",
    "past"
  ]

  return (
    <div>
      <motion.div className="flex items-center mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <Link href="/admin/projects" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Project</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new project to your portfolio</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
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
                    placeholder="project-url-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the project"
                  rows={5}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  placeholder="Detailed long description of the project"
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="e.g., 2023-Present, 2024, 2022-2023"
                  />
                </div>
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
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Section */}
              <div className="space-y-2">
                <Label>Metrics</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newMetric}
                    onChange={(e) => setNewMetric(e.target.value)}
                    placeholder="Add a metric (e.g., 13-country expansion)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMetric())}
                  />
                  <Button type="button" onClick={handleAddMetric} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-2"
                    >
                      <span className="text-gray-800 dark:text-gray-200">{metric}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMetric(metric)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
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
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading || imageUploading} className="w-full sm:w-auto">
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
