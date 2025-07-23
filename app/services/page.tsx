"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Service } from "@/lib/models/service"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const testimonials = [
    {
      quote:
        "His leadership coaching transformed our executive team. We've seen a significant improvement in communication and strategic alignment.",
      name: "Samantha Johnson",
      title: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      service: "Executive Coaching",
    },
    {
      quote:
        "The team building workshops were engaging and effective. Our employees are more connected and collaborative than ever before.",
      name: "David Lee",
      title: "HR Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      service: "Team Building",
    },
    {
      quote:
        "The strategic planning sessions helped us clarify our vision and set achievable goals. We're now on a clear path to growth.",
      name: "Maria Rodriguez",
      title: "CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      service: "Strategic Planning",
    },
  ]

  const faqs = [
    {
      question: "What types of leadership coaching do you offer?",
      answer:
        "We offer a range of coaching services, including executive coaching, team coaching, and individual leadership development programs. Our coaching is tailored to meet the specific needs and goals of each client.",
    },
    {
      question: "How do you measure the success of your team building workshops?",
      answer:
        "We use a variety of methods to measure the success of our team building workshops, including pre- and post-workshop surveys, observation, and feedback sessions. We also track key performance indicators (KPIs) to assess the long-term impact of our programs.",
    },
    {
      question: "Can you help us develop a strategic plan for our organization?",
      answer:
        "Yes, we have extensive experience in strategic planning. Our consultants will work closely with your leadership team to develop a comprehensive plan that aligns with your vision, mission, and values. We'll also help you implement the plan and track your progress.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We serve a wide range of industries, including technology, healthcare, finance, and education. Our leadership development solutions are applicable to any organization that wants to improve its leadership capabilities.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "The cost of our services varies depending on the scope and complexity of the project. We offer customized solutions to meet the specific needs and budgets of our clients. Please contact us for a free consultation and quote.",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Leadership Development Services
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Empowering leaders and organizations to achieve their full potential.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link href="/contact">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700 dark:text-gray-300">Loading services...</p>
            </div>
          ) : services.length > 0 ? (
            services.map((service, index) => <ServiceDetail key={service._id?.toString()} {...service} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700 dark:text-gray-300">No services found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Clients Say</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">Real results from real people.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
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
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.JPG"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                      <Badge className="mt-1 bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300">
                        {testimonial.service}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Answers to common questions about our services
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-orange-700 text-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Contact us today to discuss how our services can help you and your organization achieve your leadership
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-100">
                  Contact Us
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-dark border-white text-white hover:bg-white/20">
                Download Service Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ServiceDetail({ title, description, image, features, options }: Service) {
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16 last:mb-0"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>

        <div className="space-y-4 pt-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Features</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 pt-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Service Options</h4>
          <div className="grid grid-cols-1 gap-4">
            {options.map((option, index) => (
              <Card key={index} className="border-purple-100 dark:border-purple-900">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white">{option.title}</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{option.description}</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300">
                      {option.price}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <Link href="/contact">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Inquire About This Service</Button>
          </Link>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-xl">
        <div className="aspect-[4/3]">
          <Image
            src={image || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}
