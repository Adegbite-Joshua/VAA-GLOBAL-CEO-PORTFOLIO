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
import Api from "@/utils/api"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("all")
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)

    try {

      const response = await Api.get(`/api/projects`)

      if (response) {
        setProjects(response)
      } else {
        setError("Failed to fetch projects")
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      fetchProjects()
  }, [])

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

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/placeholder.JPG?height=1080&width=1920"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">From Vision to Execution</h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
              Projects that delivered real market impact across my 12+ year career
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
              <ProjectGrid loading={loading} projects={filteredProjects} />
            </TabsContent>

            <TabsContent value="current" className="mt-0">
              <ProjectGrid loading={loading} projects={filteredProjects} />
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              <ProjectGrid loading={loading} projects={filteredProjects} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Project Outcomes & Metrics */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Strategic Wins & Impact</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Highlights from my product marketing and growth strategy work
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
                title: "Go-To-Market Playbooks",
                value: "12+",
                label: "Playbooks Created",
                description: "Developed strategic frameworks used by startups and SaaS platforms",
                icon: <Target className="h-8 w-8 text-orange-600" />,
              },
              {
                title: "Sales Enablement",
                value: "50+",
                label: "Assets Developed",
                description: "Built libraries of templates, pitch decks, and demo scripts",
                icon: <Award className="h-8 w-8 text-orange-600" />,
              },
              {
                title: "Persona Workshops",
                value: "25+",
                label: "Teams Trained",
                description: "Conducted sessions that shaped product direction and messaging",
                icon: <Users className="h-8 w-8 text-orange-600" />,
              },
              {
                title: "Market Research",
                value: "40+",
                label: "Studies Completed",
                description: "Led discovery phases that influenced product strategy",
                icon: <Target className="h-8 w-8 text-orange-600" />,
              },
              {
                title: "Campaign Storytelling",
                value: "100+",
                label: "High-Conversion Campaigns",
                description: "Crafted narratives that drove measurable results",
                icon: <Award className="h-8 w-8 text-orange-600" />,
              },
              {
                title: "Global Reach",
                value: "13+",
                label: "Countries",
                description: "Projects with international impact and collaboration",
                icon: <Globe className="h-8 w-8 text-orange-600" />,
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="stats-card bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{metric.title}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">{metric.value}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{metric.label}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{metric.description}</p>
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
            <h2 className="text-3xl font-bold">Ready to Execute Your Vision?</h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Let's discuss how strategic product marketing can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-100">
                  Contact Me
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="bg-dark border-white text-white hover:bg-white/20">
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

function ProjectGrid({ projects, loading }: { projects: Project[], loading: boolean }) {
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
        <p className="text-lg text-gray-700 dark:text-gray-300">{loading ? "Loading projects" : "No projects found in this category."}</p>
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
              src={project.image || "/placeholder.JPG?height=800&width=1200"}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
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
                  className="border-purple-200 text-orange-700 dark:border-purple-800 dark:text-orange-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Results:</h4>
              <ul className="space-y-1">
                {project.metrics.map((metric, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="pt-4">
              <Link href={`/projects/${project.slug}`}>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-orange-600 hover:bg-orange-50 dark:border-purple-400 dark:text-orange-400 dark:hover:bg-orange-950/50"
                >
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div> */}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}