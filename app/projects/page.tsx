"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Target, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/models/project"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
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

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
            alt="Projects Background"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Our Projects</h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Innovative initiatives and collaborations driving meaningful impact across industries and communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Filter */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container">
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-700 dark:text-gray-300">Loading projects...</p>
                </div>
              ) : (
                <ProjectGrid projects={filteredProjects} />
              )}
            </TabsContent>

            <TabsContent value="current" className="mt-0">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-700 dark:text-gray-300">Loading projects...</p>
                </div>
              ) : (
                <ProjectGrid projects={filteredProjects} />
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-700 dark:text-gray-300">Loading projects...</p>
                </div>
              ) : (
                <ProjectGrid projects={filteredProjects} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Collaborations & Partnerships */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Collaborations & Partnerships</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Working with leading organizations to create meaningful impact
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div key={index} className="flex items-center justify-center p-4" variants={fadeIn}>
                <Image
                  src={`https://logo.clearbit.com/${["apple.com", "google.com", "microsoft.com", "amazon.com", "facebook.com", "netflix.com", "tesla.com", "ibm.com", "oracle.com", "intel.com", "cisco.com", "samsung.com"][index % 12]}`}
                  alt={`Partner ${index + 1}`}
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Outcomes & Metrics */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Project Outcomes & Metrics</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Measuring our impact through meaningful results
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
                title: "Global Reach",
                value: "25+",
                label: "Countries Impacted",
                description: "Our projects have created positive change across 5 continents.",
                icon: <Globe className="h-8 w-8 text-purple-600" />,
              },
              {
                title: "Career Development",
                value: "200%",
                label: "Average Growth",
                description: "Participants in our programs experience significant career advancement.",
                icon: <Target className="h-8 w-8 text-purple-600" />,
              },
              {
                title: "Community Building",
                value: "50,000+",
                label: "Lives Improved",
                description: "Our initiatives have directly improved lives in communities worldwide.",
                icon: <Users className="h-8 w-8 text-purple-600" />,
              },
              {
                title: "Business Impact",
                value: "35%",
                label: "Efficiency Increase",
                description: "Partner organizations report significant operational improvements.",
                icon: <Target className="h-8 w-8 text-purple-600" />,
              },
              {
                title: "Recognition",
                value: "15+",
                label: "Industry Awards",
                description: "Our projects have been recognized for excellence and innovation.",
                icon: <Award className="h-8 w-8 text-purple-600" />,
              },
              {
                title: "Sustainability",
                value: "40%",
                label: "Resource Reduction",
                description: "Our sustainability initiatives have significantly reduced resource consumption.",
                icon: <Target className="h-8 w-8 text-purple-600" />,
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{metric.title}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{metric.value}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{metric.label}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{metric.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold">Interested in Collaborating?</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              We're always looking for new partners and opportunities to create meaningful impact. Let's discuss how we
              can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                  Contact Us
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProjectGrid({ projects }: { projects: Project[] }) {
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

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-700 dark:text-gray-300">No projects found in this category.</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {projects.map((project) => (
        <motion.div
          key={project._id?.toString()}
          className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
          variants={fadeIn}
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={
                project.image ||
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
              }
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                {project.category === "current" ? "Current" : "Past"}
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{project.year}</p>
            </div>

            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Metrics:</h4>
              <ul className="space-y-1">
                {project.metrics.map((metric, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <Link href={`/projects/${project.slug}`}>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50"
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
