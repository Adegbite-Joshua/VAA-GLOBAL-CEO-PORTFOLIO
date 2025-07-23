"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Edit, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MediaItem {
  _id: string
  title: string
  type: string
  url: string
  thumbnail: string
  featured: boolean
  createdAt: string
}

export default function MediaPage() {
  const router = useRouter()
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchMediaItems()
  }, [])

  const fetchMediaItems = async () => {
    try {
      const response = await fetch("/api/media")
      if (!response.ok) {
        throw new Error("Failed to fetch media items")
      }
      const data = await response.json()
      setMediaItems(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching media items")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) {
      return
    }

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete media item")
      }

      // Remove the deleted media item from the state
      setMediaItems(mediaItems.filter((item) => item._id !== id))
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the media item")
    }
  }

  const filteredMediaItems = mediaItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Media</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your media content</p>
        </div>
        <Link href="/admin/media/new" className="mt-4 sm:mt-0">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Media
          </Button>
        </Link>
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

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search media..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading media items...</p>
              </div>
            ) : filteredMediaItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm
                    ? "No media items found matching your search."
                    : "No media items found. Create your first media item!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMediaItems.map((item) => (
                  <div key={item._id} className="border rounded-lg overflow-hidden dark:border-gray-700">
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.thumbnail || "/placeholder.JPG?height=300&width=400"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white"
                            >
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        {item.featured && " • Featured"}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/admin/media/edit/${item._id}`)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)} className="flex-1">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
