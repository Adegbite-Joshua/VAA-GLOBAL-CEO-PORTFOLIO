"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Users, Target, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Leadership() {
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
          <Image
            src="/placeholder.jpg?height=1080&width=1920"
            alt="Leadership Background"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Leadership Philosophy</h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Inspiring teams, driving innovation, and creating sustainable impact through visionary leadership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Leadership Philosophy */}
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
              <div className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Our Approach
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Vision & Leadership Philosophy</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  "Leadership is not about being in charge. It's about taking care of those in your charge." This
                  philosophy guides our approach to leadership across all levels of engagement.
                </p>
                <p>
                  We believe that true leadership emerges from a foundation of integrity, empathy, and strategic vision.
                  By understanding the unique strengths and aspirations of each team member, we create environments
                  where innovation thrives and individuals can reach their full potential.
                </p>
                <p>
                  Our leadership model emphasizes adaptability in an ever-changing global landscape, balanced with the
                  consistency of core values that include excellence, inclusivity, and sustainable growth.
                </p>
                <blockquote className="border-l-4 border-purple-600 pl-4 italic">
                  "The most powerful leadership tool you have is your own personal example."
                </blockquote>
              </div>

              <div className="pt-4">
                <Link href="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                    Book a Leadership Consultation <ArrowRight className="h-4 w-4" />
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
                      src="/placeholder.jpg?height=400&width=400&text=Leadership"
                      alt="Leadership"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.jpg?height=400&width=400&text=Teamwork"
                      alt="Teamwork"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="aspect-[9/19] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.jpg?height=800&width=400&text=Vision"
                    alt="Vision"
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

      {/* Team Leadership Experience */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Team Leadership Experience</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Building and guiding high-performing teams across industries and borders
            </p>
          </motion.div>

          <Tabs defaultValue="corporate" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="corporate">Corporate Leadership</TabsTrigger>
              <TabsTrigger value="startup">Startup Mentorship</TabsTrigger>
              <TabsTrigger value="nonprofit">Nonprofit Guidance</TabsTrigger>
            </TabsList>

            <TabsContent value="corporate" className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {[
                  {
                    role: "Chief Strategy Officer",
                    company: "Global Innovations Inc.",
                    period: "2018-2021",
                    description:
                      "Led a team of 50+ professionals across 3 continents, driving strategic initiatives that resulted in 35% revenue growth.",
                  },
                  {
                    role: "VP of International Operations",
                    company: "Tech Solutions Group",
                    period: "2015-2018",
                    description:
                      "Managed cross-functional teams in 12 countries, streamlining operations and improving efficiency by 28%.",
                  },
                ].map((experience, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{experience.role}</h3>
                    <div className="flex items-center text-purple-600 mb-4">
                      <span className="font-medium">{experience.company}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{experience.period}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Achievements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Implemented agile leadership methodologies across 5 departments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Reduced employee turnover by 40% through innovative retention strategies
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Developed leadership training programs adopted by 200+ managers
                    </span>
                  </li>
                </ul>
              </motion.div>
            </TabsContent>

            <TabsContent value="startup" className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {[
                  {
                    role: "Executive Advisor",
                    company: "TechStart Accelerator",
                    period: "2019-Present",
                    description:
                      "Mentored 25+ startup founders, helping them secure over $15M in funding and scale their operations.",
                  },
                  {
                    role: "Board Member",
                    company: "Innovation Hub",
                    period: "2017-Present",
                    description:
                      "Provided strategic guidance to early-stage companies, with 80% achieving sustainable growth within 2 years.",
                  },
                ].map((experience, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{experience.role}</h3>
                    <div className="flex items-center text-purple-600 mb-4">
                      <span className="font-medium">{experience.company}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{experience.period}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Startup Success Stories</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Guided a fintech startup from concept to $5M valuation in 18 months
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Helped an AI-driven healthcare platform secure partnerships with 3 major hospital networks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Mentored a sustainability startup that was acquired for $12M after 3 years
                    </span>
                  </li>
                </ul>
              </motion.div>
            </TabsContent>

            <TabsContent value="nonprofit" className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {[
                  {
                    role: "Board Chair",
                    company: "Global Education Initiative",
                    period: "2020-Present",
                    description:
                      "Led strategic planning that expanded educational programs to 15 new countries, impacting 50,000+ students.",
                  },
                  {
                    role: "Advisory Committee Member",
                    company: "Sustainable Future Foundation",
                    period: "2018-Present",
                    description:
                      "Helped develop and implement community-based sustainability projects across 3 continents.",
                  },
                ].map((experience, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{experience.role}</h3>
                    <div className="flex items-center text-purple-600 mb-4">
                      <span className="font-medium">{experience.company}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{experience.period}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="bg-purple-50 dark:bg-gray-800/50 rounded-xl p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Impact Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Raised $3.5M for educational initiatives in underserved communities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Developed a volunteer leadership program with 500+ active participants
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Created partnerships with 20+ corporations for sustainable development projects
                    </span>
                  </li>
                </ul>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Impact in Numbers</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Measurable results through effective leadership
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
                value: "200%",
                label: "Average Team Growth",
                icon: <Users className="h-8 w-8 text-purple-600" />,
              },
              {
                value: "35%",
                label: "Revenue Increase",
                icon: <Target className="h-8 w-8 text-purple-600" />,
              },
              {
                value: "12",
                label: "Leadership Awards",
                icon: <Award className="h-8 w-8 text-purple-600" />,
              },
              {
                value: "500+",
                label: "Leaders Mentored",
                icon: <Users className="h-8 w-8 text-purple-600" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</h3>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Keynote Speaking */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Keynote Speaking</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Inspiring audiences at conferences and events worldwide
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div className="relative aspect-video rounded-xl overflow-hidden shadow-lg" variants={fadeIn}>
                <Image
                  src="/placeholder.jpg?height=720&width=1280&text=Keynote+Speech"
                  alt="Keynote Speech"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">The Future of Global Leadership</h3>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">March 2023</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">New York, USA</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="relative aspect-video rounded-xl overflow-hidden shadow-lg" variants={fadeIn}>
                <Image
                  src="/placeholder.jpg?height=720&width=1280&text=Panel+Discussion"
                  alt="Panel Discussion"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">Innovation Through Diverse Leadership</h3>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">October 2022</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Singapore</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Speaking Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">The Future of Work and Leadership</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Building Resilient Teams in Uncertain Times
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Cross-Cultural Leadership Excellence</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Sustainable Business Practices</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Digital Transformation and Leadership</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Inclusive Leadership Strategies</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Interested in booking a speaking engagement?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Available for conferences, corporate events, and workshops
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700">Book Now</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Clips */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Video Clips & Interviews</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Watch highlights from keynotes, interviews, and podcast appearances
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                className="group relative aspect-video rounded-xl overflow-hidden shadow-lg"
                variants={fadeIn}
              >
                <Image
                  src={`/placeholder.jpg?height=720&width=1280&text=Video+${index + 1}`}
                  alt={`Video ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg font-bold">Leadership Insights: Episode {index + 1}</h3>
                  <p className="text-sm text-gray-200 mt-1">Interview with Industry Leaders</p>
                  <div className="mt-4">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                      Watch Now
                    </Button>
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
            <Link href="/media">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                View All Media
              </Button>
            </Link>
          </motion.div>
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
            <h2 className="text-3xl font-bold">Ready to Transform Your Leadership?</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Whether you're looking to develop your own leadership skills or transform your organization's leadership
              culture, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/services">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                  Explore Leadership Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
