"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ArrowRight, Award, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Typewriter from 'typewriter-effect';


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
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="order-2 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6 text-white"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
            >
              {/* Greeting Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-2 text-sm">
                <span className="text-2xl">👋</span>
                <span className="text-orange-700">Hi There! WELCOME</span>
              </div>

              {/* Name */}
              <h2 className="text-2xl md:text-3xl font-medium text-orange-400">
                I'm Tosin Ayodeji Emmanuel
              </h2>

              {/* Main Heading */}
              <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                A{' '}
                <span className="text-orange-600">
                  <Typewriter
                    options={{
                      strings: [
                        'Product Marketing Expert',
                        'Product Leader',
                        'Growth Marketing Expert',
                        'Senior Project Manager'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-black max-w-xl">
                I Develop Growth Strategies that Blend Innovation with Market Excellence
              </p>

              {/* Code-style Quote Box */}
              <div className="bg-yellow-100 text-gray-800 p-4 rounded-lg font-mono text-sm max-w-md">
                <span className="text-blue-600">const</span>{' '}
                <span className="text-red-600">Mission</span>{' '}
                <span className="text-gray-600">=</span>{' '}
                <span className="text-green-600">() =&gt;</span>{' '}
                <span className="text-orange-600">"I build for Global Impact"</span>
                <span className="text-gray-600">;</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    BOOK A CALL
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    MY PROJECTS
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="order-3 md:order-1 flex justify-center lg:justify-end"
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
                {/* Circular border with gradient */}
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    <Image
                      src="/images/home-edited.jpg"
                      alt="Tosin Ayodeji Emmanuel"
                      width={400}
                      height={400}
                      className="w-full h-full"
                      priority
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full animate-pulse delay-1000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* Quick Bio */}
      < section className="py-16 md:py-24 bg-white dark:bg-gray-950" >
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
                <Image src="/images/home.JPG" alt="Portrait" fill className="" />
              </div>
            </motion.div>

            <motion.div className="w-full md:w-2/3 space-y-4" variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why I'm Different</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Product Marketing isn't about buzzwords, it's about results. I bridge strategy with execution. Data with empathy.
                Products with real customer needs. And teams with unified vision.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium"
              >
                Read full bio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* Featured Metrics/Stats */}
      < section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900" >
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400">12+</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">Years of Experience</p>
            </motion.div>

            <motion.div
              className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
              variants={fadeIn}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400">100+</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">Products Launched</p>
            </motion.div>

            <motion.div
              className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
              variants={fadeIn}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                <Globe className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400">13+</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">Countries</p>
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* Video Introduction */}
      < section className="py-16 md:py-24 bg-white dark:bg-gray-950" >
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
            className="relative max-w-xl mx-auto aspect-[4/4] rounded-xl overflow-hidden shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-orange-600 text-white transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 ml-1" />
              </div>
            </div>
            <Image src="/images/home.JPG" alt="Video Thumbnail" fill className="" />
          </motion.div>
        </div>
      </section >

      {/* Highlighted Services */}
      < section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900" >
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
                link: "/about"
              },
              {
                title: "Leadership",
                description: "The teams I've built, led, and inspired.",
                icon: "👥",
                link: "/leadership"
              },
              {
                title: "Projects",
                description: "Real-world case studies and launch outcomes.",
                icon: "📊",
                link: "/projects"
              },
              {
                title: "Services",
                description: "Consulting to speaking to fractional product marketing leadership.",
                icon: "💼",
                link: "/services"
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
                  href={service.link}
                  className="inline-flex items-center mt-4 text-orange-600 hover:text-orange-800 font-medium"
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
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-orange-700 transition-colors"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Testimonials */}
      < section className="py-16 md:py-24 bg-white dark:bg-gray-950" >
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
                  "Tosin is one of the most dependable growth minds I’ve worked with. He has the rare ability to take ownership, drive outcomes, and communicate clearly at every level. I trusted him with key initiatives, and he delivered every time.",
                name: "Taiwo Aiyerin",
                title: "CEO, Scenario Academy",
              },
              {
                quote:
                  "Tosin joined VTpass and immediately elevated our digital game. From campaign planning to execution, his leadership has driven real business growth. He’s not just a marketer, he’s a growth architect.",
                name: "Lanre Ogunya",
                title: "Founder/CEO, VTpass (Broadshift Technologies)",
              },
              {
                quote:
                  "Tosin's marketing insight helped us execute successful campaigns for global brands like Guinness and Jameson. His creativity and data-driven thinking made a visible difference in client results.",
                name: "Taiwo Ogunwunmi",
                title: "Managing Director, Brooks and Blakes",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                variants={fadeIn}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-orange-500" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center mt-6">
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
      </section >

      {/* Newsletter Signup */}
      < section className="py-16 md:py-24 bg-orange-700 text-white" >
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Let's Get Started</h2>
            <p className="text-lg text-orange-100">
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
                  <Button className="bg-white text-orange-700 hover:bg-orange-100">Subscribe</Button>
                </form>
                <p className="text-xs text-orange-200 mt-4">
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
      </section >
    </div >
  )
}