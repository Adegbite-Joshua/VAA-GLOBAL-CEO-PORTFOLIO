"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Api from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"


interface Experience {
  _id?: string
  year: string
  title: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isMobileView = useIsMobile()


  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await Api.get<Experience[]>("/api/experiences");
      console.log("response", response);

      setExperiences(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch experiences",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
            >
              {/* Heading */}
              <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                A Product Marketing Leader Who Builds With Purpose
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                Scaling With Strategy, and Leading With Vision
              </p>

              {/* Description */}
              <div className="space-y-4 text-gray-700">
                <p>
                  With over a decade of experience in product marketing and growth strategy,
                  I specialize in transforming innovative ideas into market-leading products.
                </p>
                <p>
                  My approach combines data-driven insights with creative problem-solving
                  to deliver exceptional results for global brands and startups alike.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    LEARN MORE
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    GET IN TOUCH
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
                }
              }}
            >
              <div className="relative">
                {/* Image with decorative border */}
                <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about.jpg"
                    alt="Tosin Ayodeji Emmanuel - Product Marketing Leader"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full animate-pulse delay-1000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Bio */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container h-4/6">
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
                  I'm Tosin Ayodeji Emmanuel, a Product Marketer, Growth Strategist, and Global Tech Leader with 12+ years of driving adoption and market success across digital products.
                </p>
                <p>
                  From scaling EdTech into 13+ countries to launching startups across Fintech, SaaS, and eCommerce, I've helped products break through, guided by deep research, positioning clarity, and user insight.
                </p>
                <p>
                  Today, I'm expanding that impact into Web3, where decentralization, community, and transparency shape how products grow.
                </p>
                <p>
                  My focus: bridging Web2 strategy with Web3 values to help founders build trust, drive utility, and grow adoption in a fragmented market.
                </p>
                <p>
                  Whether it's launching, scaling, or repositioning, I connect the right product with the right people, across any layer of the stack.
                </p>
              </div>

              <div className="pt-4">
                {/* <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button> */}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="relative ms-auto w-full md:w-2/4 aspect-[4/4] rounded-xl overflow-hidden shadow-xl">
                <Image src="/images/about.jpg" alt="Portrait" fill className="" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-4 rounded-lg shadow-lg">
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
            {experiences?.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${isMobileView ? "left" : (index % 2 === 0 ? "left" : "right")} mb-12`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <div
                  className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ${index / 2 == 0 ? "text-right" : "text-left"}`}
                >
                  <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium mb-2">
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
                description: "Growth isn't accidental, it's engineered",
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
                <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-16 md:py-24 bg-orange-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">My Global Impact</h2>
            <p className="text-lg text-orange-100">
              The measurable results of strategic product marketing and leadership
            </p>

            <Card className="bg-white/10 border-0 backdrop-blur-sm">
              <CardContent className="pt-6 pb-6 text-white mx-auto">
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
                    {/* <Button className="bg-white text-orange-700 hover:bg-orange-100 w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Case Studies
                    </Button>
                    <Button variant="outline" className="bg-dark border-white text-white hover:bg-white/20 w-full">
                      Speaking Engagements
                    </Button> */}
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
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Let's Connect
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-purple-600 text-orange-600 hover:bg-orange-50">
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