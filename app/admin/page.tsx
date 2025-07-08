"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, Video, Users, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardStats {
  blogPosts: number
  projects: number
  mediaItems: number
  testimonials: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    blogPosts: 0,
    projects: 0,
    mediaItems: 0,
    testimonials: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real application, you would fetch actual stats from your API
        // For now, we'll simulate a delay and use dummy data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStats({
          blogPosts: 9,
          projects: 6,
          mediaItems: 12,
          testimonials: 8,
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Recent activity data (dummy data)
  const recentActivity = [
    { type: "blog", title: "5 Leadership Trends to Watch in 2023", date: "2 hours ago" },
    { type: "project", title: "Global Talent Connect", date: "1 day ago" },
    { type: "media", title: "The Future of Global Leadership", date: "3 days ago" },
    { type: "testimonial", title: "New testimonial from Sarah Johnson", date: "1 week ago" },
  ]

  return (
    <div>
      <motion.div className="mb-8" initial="hidden" animate="visible" variants={fadeIn}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your admin dashboard. Here's an overview of your site.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Blog Posts</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {loading ? "..." : stats.blogPosts}
                </h3>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {loading ? "..." : stats.projects}
                </h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Media Items</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {loading ? "..." : stats.mediaItems}
                </h3>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <Video className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Testimonials</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {loading ? "..." : stats.testimonials}
                </h3>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div className="lg:col-span-2" initial="hidden" animate="visible" variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4">
                      {activity.type === "blog" && <FileText className="h-5 w-5 text-orange-600" />}
                      {activity.type === "project" && <Briefcase className="h-5 w-5 text-blue-600" />}
                      {activity.type === "media" && <Video className="h-5 w-5 text-green-600" />}
                      {activity.type === "testimonial" && <Users className="h-5 w-5 text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/blog/new">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <FileText className="h-4 w-4 mr-2" />
                  New Blog Post
                </Button>
              </Link>
              <Link href="/admin/projects/new">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Briefcase className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
              <Link href="/admin/media/new">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Video className="h-4 w-4 mr-2" />
                  New Media Item
                </Button>
              </Link>
              <Link href="/admin/testimonials/new">
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <Users className="h-4 w-4 mr-2" />
                  New Testimonial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
