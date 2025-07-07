"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ArrowRight, Award, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <Image
            src="/images/home.JPG"
            alt="Hero Background"
            fill
            className="h-full aspect-square"
            priority
          />
        </div>

        <div className="container relative z-20">
          <motion.div
            className="max-w-3xl mx-auto text-center text-white space-y-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Crafting Global Impact Through Product Marketing, Growth Strategy, and Leadership
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Welcome to the portfolio of Tosin Ayodeji Emmanuel - A transformative Product Marketing Expert, Growth Strategist, and Founder of VAA Global Tech Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                View Portfolio
              </Button>
              <Button size="lg" variant="outline" className="bg-dark text-white border-white hover:bg-white/20">
                Book a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Bio */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="w-full md:w-1/3 flex justify-center" variants={fadeIn}>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl">
                <Image src="/images/home.JPG" alt="Portrait" fill className="object-cover" />
              </div>
            </motion.div>

            <motion.div className="w-full md:w-2/3 space-y-4" variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why I'm Different</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Product Marketing isn't about buzzwords — it's about results. I bridge strategy with execution. Data with empathy. 
                Products with real customer needs. And teams with unified vision.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
              >
                Read full bio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Metrics/Stats */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Expertise at a Glance</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Driving meaningful change through product marketing and growth strategy
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
              variants={fadeIn}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400">12+</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">Years of Experience</p>
            </motion.div>

            <motion.div
              className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
              variants={fadeIn}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400">100+</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">Products Launched</p>
            </motion.div>

            <motion.div
              className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
              variants={fadeIn}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400">13+</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">Countries</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Introduction */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Message</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              The world doesn't need another marketer. It needs difference-makers who launch with clarity, lead with empathy, and grow with data.
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-purple-600 text-white transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 ml-1" />
              </div>
            </div>
            <Image src="/images/home.JPG" alt="Video Thumbnail" fill className="" />
          </motion.div>
        </div>
      </section>

      {/* Highlighted Services */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What You'll Find Here</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              This portfolio isn't just a highlight reel. It's a playbook for what's possible when deep experience meets purpose-driven strategy.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "About",
                description: "My career story, values, and impact.",
                icon: "👤",
              },
              {
                title: "Leadership",
                description: "The teams I've built, led, and inspired.",
                icon: "👥",
              },
              {
                title: "Projects",
                description: "Real-world case studies and launch outcomes.",
                icon: "📊",
              },
              {
                title: "Services",
                description: "Consulting to speaking to fractional product marketing leadership.",
                icon: "💼",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="service-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                variants={fadeIn}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center mt-4 text-purple-600 hover:text-purple-800 font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-purple-700 transition-colors"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Do People Say?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              What clients and partners say about working with me
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                quote:
                  "Working with Tosin transformed our approach to product marketing. The insights provided were invaluable.",
                name: "Sarah Johnson",
                title: "Marketing Director, Tech Company",
                image: "/placeholder.jpg?height=100&width=100",
              },
              {
                quote:
                  "The product launch strategy exceeded our expectations. Our market entry was more successful than ever.",
                name: "Michael Chen",
                title: "CEO, Startup",
                image: "/placeholder.jpg?height=100&width=100",
              },
              {
                quote:
                  "Tosin's keynote at our conference was inspiring and thought-provoking. Attendees are still talking about it.",
                name: "Emma Rodriguez",
                title: "Event Director",
                image: "/placeholder.jpg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                variants={fadeIn}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center mt-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.jpg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24 bg-purple-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Let's Get Started</h2>
            <p className="text-lg text-purple-100">
              Whether you're a startup looking to launch, a tech company scaling into new markets, or an organization in need of strategic marketing leadership — you're in the right place.
            </p>

            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-purple-400"
                  />
                  <Button className="bg-white text-purple-700 hover:bg-purple-100">Subscribe</Button>
                </form>
                <p className="text-xs text-purple-200 mt-4">
                  By subscribing, you agree to our{" "}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>{" "}
                  and consent to receive updates.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}