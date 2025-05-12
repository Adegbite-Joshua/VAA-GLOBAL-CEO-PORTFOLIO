"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Menu,
  X,
  LogOut,
  MessageSquare,
  ImageIcon,
  Layers,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Blog Posts", href: "/admin/blog", icon: <FileText className="h-5 w-5" /> },
    { name: "Projects", href: "/admin/projects", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Services", href: "/admin/services", icon: <Layers className="h-5 w-5" /> },
    { name: "Media", href: "/admin/media", icon: <ImageIcon className="h-5 w-5" /> },
    { name: "Messages", href: "/admin/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  const overlayVariants = {
    open: { opacity: 0.5, display: "block" },
    closed: { opacity: 0, display: "none", transition: { delay: 0.2 } },
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-20 lg:hidden"
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={overlayVariants}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30 lg:relative lg:translate-x-0"
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      pathname === item.href || pathname?.startsWith(`${item.href}/`)
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                        : ""
                    }`}
                    onClick={closeSidebar}
                  >
                    <span className="mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t dark:border-gray-700">
            <Link
              href="/api/auth/logout"
              className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {navItems.find((item) => pathname === item.href || pathname?.startsWith(`${item.href}/`))?.name ||
                  "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center">{/* Add profile or notification icons here if needed */}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
