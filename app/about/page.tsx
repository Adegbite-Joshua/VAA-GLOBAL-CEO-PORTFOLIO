"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
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
      <section className="relative py-20 md:py-28 bg-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/placeholder.jpg?height=1080&width=1920" alt="About Background" fill className="object-cover" />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">About Our CEO</h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              A visionary leader committed to empowering talent and driving innovation across industries and borders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full Bio */}
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Background</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  With over 11 years of experience in leadership roles across multiple industries, our CEO has
                  established a reputation for driving innovation and fostering talent development on a global scale.
                </p>
                <p>
                  After graduating with honors from [University Name] with a degree in Business Administration and a
                  Master's in International Relations, they began their career at [Company Name], where they quickly
                  rose through the ranks to lead their international expansion efforts.
                </p>
                <p>
                  In 2015, they founded [Company Name], a platform dedicated to connecting talented professionals with
                  opportunities across borders, which has since grown to operate in over 25 countries and has
                  facilitated more than 100,000 job placements.
                </p>
                <p>
                  Their unique approach to leadership combines strategic vision with a deep commitment to developing
                  human potential, making them a sought-after advisor for organizations looking to thrive in an
                  increasingly complex global landscape.
                </p>
              </div>

              <div className="pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Media Kit
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                <Image src="/placeholder.jpg?height=800&width=600" alt="CEO Portrait" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Personal Mission:</p>
                <p className="italic">
                  "Empowering individuals to reach their full potential and create positive change in the world."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Career Milestones</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              A journey of leadership, innovation, and impact
            </p>
          </motion.div>

          <div className="timeline-container max-w-4xl mx-auto py-8">
            {[
              {
                year: "2012",
                title: "Early Career",
                description: "Graduated with honors and joined [Company Name] as a Management Trainee.",
                isLeft: true,
              },
              {
                year: "2014",
                title: "Leadership Role",
                description: "Promoted to Head of International Relations, leading a team of 15 professionals.",
                isLeft: false,
              },
              {
                year: "2015",
                title: "Entrepreneurial Venture",
                description: "Founded [Company Name] with a mission to connect global talent with opportunities.",
                isLeft: true,
              },
              {
                year: "2017",
                title: "International Expansion",
                description: "Expanded operations to 10 countries across Europe and Asia.",
                isLeft: false,
              },
              {
                year: "2019",
                title: "Industry Recognition",
                description: "Received the [Award Name] for contributions to talent development.",
                isLeft: true,
              },
              {
                year: "2021",
                title: "Strategic Partnership",
                description: "Formed strategic alliance with [Partner Name] to enhance global reach.",
                isLeft: false,
              },
              {
                year: "2023",
                title: "Current Focus",
                description: "Leading initiatives in AI-driven talent matching and sustainable workforce development.",
                isLeft: true,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${item.isLeft ? "left" : "right"} mb-12`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <div
                  className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ${item.isLeft ? "text-right" : "text-left"}`}
                >
                  <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos & Highlights */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Photos & Highlights</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Key moments from conferences, events, and leadership activities
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div key={index} className="group relative overflow-hidden rounded-xl" variants={fadeIn}>
                <div className="aspect-[4/3] relative">
                  <Image
                    src={`/placeholder.jpg?height=600&width=800&text=Event+${index + 1}`}
                    alt={`Event ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg">Event Title {index + 1}</h3>
                      <p className="text-sm text-gray-200">Location, Year</p>
                    </div>
                  </div>
                </div>
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
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              View Full Gallery
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 md:py-24 bg-purple-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Media Kit</h2>
            <p className="text-lg text-purple-100">
              Download our comprehensive media kit for press inquiries, speaking engagements, and partnerships.
            </p>

            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="pt-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl">What's Included:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Professional biography</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>High-resolution photos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Speaking topics & expertise areas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Previous media appearances</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Contact information for inquiries</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-4">
                    <Button className="bg-white text-purple-700 hover:bg-purple-100 w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Media Kit (PDF)
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20 w-full">
                      Press Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Interested in Working Together?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you're looking for a keynote speaker, strategic advisor, or collaboration partner, we'd love to
              connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Contact Us
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
