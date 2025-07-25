"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  category: string
  author: string
  featured: boolean
  published: boolean
  tags: string[]
}

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Extract unique categories from blog posts
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  const filteredPosts = blogPosts
    .filter(
      (post) =>
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((post) => selectedCategory === "all" || post.category === selectedCategory)

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1920&auto=format&fit=crop"
            alt="Blog Background"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Leadership Insights</h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
              Thought leadership, industry trends, and practical advice on leadership, innovation, and professional
              growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="w-full md:w-64 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    selectedCategory === category
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "border-purple-200 text-orange-700 hover:bg-orange-50 dark:border-purple-800 dark:text-orange-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </Badge>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700 dark:text-gray-300">Loading articles...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Articles</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPosts.slice(0, 2).map((post) => (
                      <FeaturedPostCard key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700 dark:text-gray-300">No articles found matching your criteria.</p>
              <Button
                variant="link"
                className="text-orange-600 mt-2"
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchQuery("")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-purple-200 text-orange-700 hover:bg-orange-50 dark:border-purple-800 dark:text-orange-300"
                  disabled
                >
                  Previous
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">1</Button>
                <Button
                  variant="outline"
                  className="border-purple-200 text-orange-700 hover:bg-orange-50 dark:border-purple-800 dark:text-orange-300"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-200 text-orange-700 hover:bg-orange-50 dark:border-purple-800 dark:text-orange-300"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-200 text-orange-700 hover:bg-orange-50 dark:border-purple-800 dark:text-orange-300"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-orange-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Subscribe to My Newsletter</h2>
            <p className="text-lg text-orange-100">
              Get the latest leadership insights, industry trends, and exclusive content delivered directly to your
              inbox.
            </p>

            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form className="flex flex-col sm:flex-row gap-4" action="/api/newsletter/subscribe" method="POST">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-purple-400"
                    required
                  />
                  <Button type="submit" className="bg-white text-orange-700 hover:bg-orange-100">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-orange-200 mt-4">
                  By subscribing, you agree to{" "}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>{" "}
                  and consent to receive update
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col"
      variants={fadeIn}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={
            post.coverImage ||
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"
          }
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-orange-600 hover:bg-orange-700 text-white">Featured</Badge>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="space-y-3 flex-grow">
          <Badge
            variant="outline"
            className="border-purple-200 text-orange-700 dark:border-purple-800 dark:text-orange-300"
          >
            {post.category}
          </Badge>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</span>
          </div>

          <Link href={`/blog/${post._id}`}>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-0">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col"
      variants={fadeIn}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={
            post.coverImage ||
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"
          }
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="space-y-3 flex-grow">
          <Badge
            variant="outline"
            className="border-purple-200 text-orange-700 dark:border-purple-800 dark:text-orange-300"
          >
            {post.category}
          </Badge>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{post.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{post.excerpt}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
              <Image
                src="/images/home-edited.jpg"
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-gray-900 dark:text-white">{post.author}</span>
          </div>

          <Link href={`/blog/${post._id}`}>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-0">
              Read <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
