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
      <section className="relative md:h-[80vh] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.jpg?height=1080&width=1920"
            alt="Leadership Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container flex relative z-20 h-full w-full bg-orange-600/50 ">
          <motion.div
            className="max-w-3xl m-auto text-center space-y-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Leading With Vision. Scaling With Strategy. Building With People.</h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
              Leadership is not a title. It's a responsibility.
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
              <div className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium mb-2">
                My Philosophy
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">"Lead with clarity. Build trust. Scale with people. Grow with purpose."</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  I believe leadership isn’t just about vision, it’s about alignment, systems, and service. It’s seeing the road ahead clearly, then empowering others to walk it with you.
                </p>
                <p>
                  Over the past 12+ years, I’ve led growth across teams, products, and markets,  from zero to thousands of users, across continents and verticals. Whether in Web2 or Web3, the principle stays the same:
                </p>
                <blockquote className="border-l-4 border-purple-600 pl-4 italic">
                  "You don’t lead alone, you lead by multiplying others."
                </blockquote>
              </div>

              <div className="pt-4">
                <Link href="/contact">
                  <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
                    Book Leadership Consultation <ArrowRight className="h-4 w-4" />
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
                      src="/images/leadership.JPG"
                      alt="Team Leadership"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/images/about.JPG"
                      alt="Mentorship"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="aspect-[9/19] rounded-xl overflow-hidden">
                  <Image
                    src="/images/home.JPG"
                    alt="Global Impact"
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

      {/* Leadership Experience */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Leadership Roles</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Building and guiding high-performing teams across industries and borders
            </p>
          </motion.div>

          <Tabs defaultValue="vaa" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="vaa">VAA Global</TabsTrigger>
              <TabsTrigger value="vtpass">VTpass</TabsTrigger>
              <TabsTrigger value="consulting">Consulting</TabsTrigger>
            </TabsList>

            <TabsContent value="vaa" className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Founder & Senior Executive</h3>
                  <div className="flex items-center text-orange-600 mb-4">
                    <span className="font-medium">VAA Global Tech Hub</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">2023 – Present | 13+ Countries</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Built and scaled one of Africa's fastest-growing EdTech platforms, growing a global learner base and launching 28+ tech programs.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Global Expansion</h3>
                  <div className="flex items-center text-orange-600 mb-4">
                    <span className="font-medium">Strategic Leadership</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Led full rebranding and organizational transformation, establishing global partnerships and securing international accreditation.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-orange-500 dark:bg-gray-800/50 rounded-xl p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <h3 className="text-xl font-bold text-white mb-4">Key Achievements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white ">
                      Scaled operations to 13 countries with multilingual programs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white ">
                      Impacted 5,000+ students through tech education
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span className="text-white ">
                      Facilitated 200% growth in job placements
                    </span>
                  </li>
                </ul>
              </motion.div>
            </TabsContent>

            <TabsContent value="vtpass" className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Digital Marketing Head</h3>
                  <div className="flex items-center text-orange-600 mb-4">
                    <span className="font-medium">VTpass (Broadshift Technologies)</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">2024 - Present | Nigeria</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Leading strategic digital transformation, revenue growth, and cross-functional team alignment.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Operational Leadership</h3>
                  <div className="flex items-center text-orange-600 mb-4">
                    <span className="font-medium">Team Development</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Managing content strategy, sales support, campaign execution, and performance analytics for digital transformation.
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="consulting" className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Growth Leader & Consultant</h3>
                  <div className="flex items-center text-orange-600 mb-4">
                    <span className="font-medium">Radartrail, Vonjour, ShoppedbyN</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">2019 – 2023 | Europe & Africa</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Directed multi-brand growth strategy, team coaching, and data-driven campaigns across multiple industries.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Team Leadership</h3>
                  <div className="flex items-center text-orange-600 mb-4">
                    <span className="font-medium">Cross-Functional Collaboration</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Mentored junior marketers, collaborated cross-functionally, and led remote-first teams in fast-paced environments.
                  </p>
                </motion.div>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Leadership in Action</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Measurable results through strategic leadership
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
                value: "13+",
                label: "Countries Reached",
                icon: <MapPin className="h-8 w-8 text-orange-600" />,
              },
              {
                value: "28+",
                label: "Tech Programs Launched",
                icon: <Target className="h-8 w-8 text-orange-600" />,
              },
              {
                value: "200%",
                label: "Job Placement Growth",
                icon: <Award className="h-8 w-8 text-orange-600" />,
              },
              {
                value: "5000+",
                label: "Students Impacted",
                icon: <Users className="h-8 w-8 text-orange-600" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400">{stat.value}</h3>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mentorship & Giving Back</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Leadership is about lifting others as you climb
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
                  src="/placeholder.jpg?height=720&width=1280&text=Mentorship"
                  alt="Mentorship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">Weekly Mentorship Sessions</h3>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Ongoing</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">Global (Virtual)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="relative aspect-video rounded-xl overflow-hidden shadow-lg" variants={fadeIn}>
                <Image
                  src="/placeholder.jpg?height=720&width=1280&text=Career+Development"
                  alt="Career Development"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">Career Development</h3>
                  <div className="flex items-center mt-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Helping professionals secure global opportunities</span>
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mentorship Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Helped students secure global jobs and internships</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Provided career path clarity for aspiring professionals
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Built confidence in tech careers</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Guided digital portfolio development</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Interested in mentorship opportunities?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Limited slots available for 1:1 coaching
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="bg-orange-600 hover:bg-orange-700">Apply Now</Button>
                </Link>
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What My Teams Say</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Feedback from colleagues and mentees
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                quote: "Tosin Ayodeji is one of the most exceptional young leaders I’ve worked with. At VAA Global, he leads with audacity, focus, and a drive that’s truly inspiring. His commitment to excellence and bold goal-setting is unmatched.",
                name: "David Kolade Omojuwa",
                role: "Managing Resources Nikky Taurus Nigeria Limited",
              },
              {
                quote: "Working with Tosin has been both empowering and energizing. His leadership is clear, decisive, and deeply human. He doesn’t just set high standards, he supports you to rise to them. VAA Global’s impact is a reflection of his vision and execution.",
                name: "Sandra Aibangbee",
                role: "Head of Operations, ReadWrite Data Solutions Limited | Project Management Instructor, VAA Global",
              },
              {
                quote: "I’ve worked with Tosin for over five years, and his consistency still amazes me. He leads with clarity, inspires with vision, and pushes for excellence in everything. VAA Global’s growth is no accident, it’s the result of Tosin’s relentless drive and strategic mind.",
                name: "Miracle Ndikom",
                role: "Miracle Ndikom, Head of Training, School of Service",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                variants={fadeIn}
              >
                <div className="mb-4">
                  <svg className="h-8 w-8 text-orange-500" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{testimonial.quote}</p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-orange-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Ready to Build Something Bigger?</h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              If you're looking for a strategic leader, mentor, or growth consultant — let's connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/services">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-100">
                  Explore Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-dark border-white text-white hover:bg-white/20">
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}