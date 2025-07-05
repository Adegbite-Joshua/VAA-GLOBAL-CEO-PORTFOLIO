"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink, Download, Play, Newspaper, Video, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { MediaItem } from "@/lib/models/media"

export default function Media() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const fetchMediaItems = async () => {
      try {
        const response = await fetch("/api/media")
        if (!response.ok) {
          throw new Error("Failed to fetch media items")
        }
        const data = await response.json()
        setMediaItems(data)
      } catch (error) {
        console.error("Error fetching media items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMediaItems()
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

  const filteredMedia = mediaItems
    .filter((item) => filter === "all" || item.type === filter)
    .filter(
      (item) =>
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop"
            alt="Media Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Media & Press</h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Explore keynotes, interviews, articles, and more featuring insights on leadership, innovation, and global
              business trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Media Filter & Search */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setFilter}>
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="podcast">Podcasts</TabsTrigger>
                <TabsTrigger value="article">Articles</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-full md:w-64">
              <Input
                type="search"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700 dark:text-gray-300">Loading media items...</p>
            </div>
          ) : filteredMedia.length > 0 ? (
            <MediaGrid media={filteredMedia} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700 dark:text-gray-300">No media items found matching your criteria.</p>
              <Button
                variant="link"
                className="text-purple-600 mt-2"
                onClick={() => {
                  setFilter("all")
                  setSearchQuery("")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured In</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Recognized by leading media outlets and publications
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              "forbes.com",
              "wsj.com",
              "nytimes.com",
              "bloomberg.com",
              "cnbc.com",
              "techcrunch.com",
              "wired.com",
              "fastcompany.com",
              "inc.com",
              "entrepreneur.com",
              "businessinsider.com",
              "fortune.com",
            ].map((domain, index) => (
              <motion.div key={index} className="flex items-center justify-center p-4" variants={fadeIn}>
                <Image
                  src={`https://logo.clearbit.com/${domain}`}
                  alt={`Media Outlet ${index + 1}`}
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Press Kit</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Download our comprehensive press kit for media inquiries, speaking engagements, and partnerships.
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Professional biography</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">High-resolution photos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Speaking topics & expertise areas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Previous media appearances</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Contact information for inquiries</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Press Kit
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    Media Contact
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=400&auto=format&fit=crop"
                      alt="Press Image 1"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop"
                      alt="Press Image 2"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="aspect-[9/19] rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop"
                    alt="Press Image 3"
                    width={400}
                    height={800}
                    className="object-cover h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-purple-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Interested in a Media Appearance?</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Available for interviews, podcasts, speaking engagements, and expert commentary on leadership, innovation,
              and global business trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                  Contact for Media Inquiries
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="bg-dark border-white text-white hover:bg-white/20">
                  Speaking Engagements
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function MediaGrid({ media }: { media: MediaItem[] }) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "podcast":
        return <Mic className="h-5 w-5" />
      case "article":
        return <Newspaper className="h-5 w-5" />
      default:
        return <Video className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {media.map((item) => (
        <motion.div
          key={item._id?.toString()}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
          variants={fadeIn}
        >
          <div className="relative aspect-video">
            <Image
              src={
                item.image ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              }
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-600/80 flex items-center justify-center text-white cursor-pointer hover:bg-purple-700/80 transition-colors">
                  <Play className="h-8 w-8 ml-1" />
                </div>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1">
                {getTypeIcon(item.type)}
                <span className="capitalize">{item.type}</span>
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300">{item.description}</p>

            <div className="pt-4">
              <Link href={item.link}>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50 flex items-center justify-center gap-2"
                >
                  {item.type === "video" ? "Watch Now" : item.type === "podcast" ? "Listen Now" : "Read Article"}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
