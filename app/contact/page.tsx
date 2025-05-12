"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { fadeIn, staggerContainer } from "@/utils/motion"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    // Here you would typically handle the form submission,
    // such as sending the data to a server.
    console.log(formData)
    // Reset form data after submission (optional)
    setFormData({
      name: "",
      email: "",
      message: "",
      subscribe: false,
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
              We'd love to hear from you! Get in touch using the form below or connect with us on social media.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Card className="dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Send us a Message</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    We aim to respond to all inquiries within 24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="grid gap-4">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Your Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className="grid gap-4">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your Message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        id="subscribe"
                        checked={formData.subscribe}
                        onChange={(e) => {
                          const checked = e.target.checked
                          setFormData((prev) => ({ ...prev, subscribe: checked }))
                        }}
                      />
                      <Label htmlFor="subscribe" className="text-sm cursor-pointer">
                        Subscribe to our newsletter for updates and insights
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.jpg?height=600&width=800&text=Map"
                  alt="Office Location Map"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Connect With Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Follow us on social media for the latest updates, insights, and announcements.
                </p>

                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book a Call</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Schedule a 30-minute consultation to discuss your specific needs and how we can help.
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Schedule Consultation</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
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
              Find quick answers to common questions about our services and process
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto grid gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                question: "What services do you offer?",
                answer:
                  "We offer a range of leadership development services including executive coaching, team building workshops, strategic planning, keynote speaking, and corporate consulting. Each service is tailored to meet the specific needs of our clients.",
              },
              {
                question: "How do I book a speaking engagement?",
                answer:
                  "To book a speaking engagement, please fill out the contact form on this page with details about your event, including the date, location, audience size, and topic of interest. Our team will get back to you within 48 hours to discuss availability and requirements.",
              },
              {
                question: "What is your typical response time?",
                answer:
                  "We strive to respond to all inquiries within 24-48 business hours. For urgent matters, please indicate this in your message or call our office directly.",
              },
              {
                question: "Do you offer virtual consultations?",
                answer:
                  "Yes, we offer virtual consultations and services for clients worldwide. Our digital platforms allow us to deliver the same high-quality experience regardless of location.",
              },
              {
                question: "How can I request a media interview?",
                answer:
                  "Media representatives can submit interview requests through our contact form or by emailing our media relations team directly at media@ceoname.com. Please include details about your publication, the topic you'd like to discuss, and your deadline.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                variants={fadeIn}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
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
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Whether you're looking for leadership development, speaking engagements, or strategic consulting, we're
              here to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                Contact Us Now
              </Button>
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
