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

interface Service {
  _id: string
  title: string
  slug: string
  description: string
  icon: string
  featured: boolean
  createdAt: string
}

export default function ServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (!response.ok) {
        throw new Error("Failed to fetch services")
      }
      const data = await response.json()
      setServices(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching services")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete service")
      }

      // Remove the deleted service from the state
      setServices(services.filter((service) => service._id !== id))
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the service")
    }
  }

  const filteredServices = services.filter((service) => service.title.toLowerCase().includes(searchTerm.toLowerCase()))

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your offered services</p>
        </div>
        <Link href="/admin/services/new" className="mt-4 sm:mt-0">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Service
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
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm
                    ? "No services found matching your search."
                    : "No services found. Create your first service!"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                        Featured
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((service) => (
                      <tr key={service._id} className="border-b dark:border-gray-700">
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{service.title}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {service.featured ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => router.push(`/admin/services/${service._id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(service._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
