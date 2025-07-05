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
        <div className="absolute inset-0 z-0 opacity-70">
          <Image src="/images/about.JPG" alt="About Background" fill className="" />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A Product Marketing Leader Who Builds With Purpose
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Scaling With Strategy, and Leading With Vision
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Journey So Far</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  I'm Tosin Ayodeji Emmanuel — a product marketer, growth strategist, and global tech leader with over 12 years of experience transforming ideas into category-defining products.
                </p>
                <p>
                  From launching fast-growing startups to scaling EdTech into 13+ countries, my journey has always centered on one mission: To connect brilliant products with the people who need them — through research, empathy, data, and intentional marketing.
                </p>
                <p>
                  I've built, led, and grown brands across Fintech, EdTech, Fashion, SaaS, eCommerce, and Consumer Products.
                </p>
              </div>

              <div className="pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
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
                <Image src="/images/about.JPG" alt="Portrait" fill className="" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Personal Mission:</p>
                <p className="italic">
                  "Connecting value with need through strategic product marketing"
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Experience</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Key milestones in my product marketing journey
            </p>
          </motion.div>

          <div className="timeline-container max-w-4xl mx-auto py-8">
            {[
              {
                year: "Present",
                title: "Digital Marketing Head",
                description: "Leading strategy and revenue-focused marketing at VTpass",
                isLeft: true,
              },
              {
                year: "2020",
                title: "Founder & Senior Executive",
                description: "Built VAA Global Tech Hub, empowering thousands across 3 continents",
                isLeft: false,
              },
              {
                year: "2018",
                title: "Marketing Consultant",
                description: "Worked with global brands like Guinness Nigeria and Beefeater London",
                isLeft: true,
              },
              {
                year: "2015",
                title: "Product Marketing Expert",
                description: "Developed expertise in GTM strategy, user research, and product storytelling",
                isLeft: false,
              },
              {
                year: "2012",
                title: "Early Career",
                description: "Began my journey in digital marketing and growth strategy",
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

      {/* What Drives Me */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Drives Me</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              The principles that guide my approach to product marketing
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Customer Obsession",
                description: "Marketing must serve both the business and the people it reaches",
              },
              {
                title: "Clear Messaging",
                description: "Products should be positioned with absolute clarity",
              },
              {
                title: "Data-Driven Empathy",
                description: "Let data guide, but empathy should lead",
              },
              {
                title: "Strategic Growth",
                description: "Growth isn't accidental — it's engineered",
              },
              {
                title: "Collaboration",
                description: "Radical cross-functional alignment is key",
              },
              {
                title: "Value Translation",
                description: "We're translators between value and need",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                variants={fadeIn}
              >
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-16 md:py-24 bg-purple-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">My Global Impact</h2>
            <p className="text-lg text-purple-100">
              The measurable results of strategic product marketing and leadership
            </p>

            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="pt-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl">Key Achievements:</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Led VAA Global's expansion into 13 countries</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Launched 28+ career-centric tech programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Impacted 5,000+ learners globally</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Partnered with Skill Development Council of Canada</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Hosted numerous webinars and mentorship sessions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-4">
                    <Button className="bg-white text-purple-700 hover:bg-purple-100 w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Case Studies
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20 w-full">
                      Speaking Engagements
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to Build Something Great?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              I work with forward-thinking founders and teams ready to scale their product marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Let's Connect
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