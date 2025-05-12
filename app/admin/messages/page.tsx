"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, CheckCircle, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Message {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
  read: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contact")
        if (!response.ok) throw new Error("Failed to fetch messages")

        const data = await response.json()
        setMessages(data)
      } catch (err) {
        setError("Error loading messages")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message)

    // Mark as read if not already
    if (!message.read) {
      try {
        const response = await fetch(`/api/contact/${message._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...message, read: true }),
        })

        if (response.ok) {
          // Update local state
          setMessages(messages.map((m) => (m._id === message._id ? { ...m, read: true } : m)))
        }
      } catch (err) {
        console.error("Error marking message as read:", err)
      }
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Remove from local state
        setMessages(messages.filter((m) => m._id !== id))
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null)
        }
      } else {
        throw new Error("Failed to delete message")
      }
    } catch (err) {
      console.error("Error deleting message:", err)
      alert("Failed to delete message")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No messages found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b">
              <h2 className="font-medium">Messages ({messages.length})</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                    selectedMessage?._id === message._id ? "bg-blue-50" : ""
                  } ${!message.read ? "font-semibold" : ""}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="flex justify-between items-start">
                    <div className="truncate">{message.name}</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 truncate">{message.email}</div>
                  <div className="text-sm text-gray-500 truncate">{message.message}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 border rounded-lg">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{selectedMessage.name}</h2>
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="text-gray-600 mb-1">
                    <Mail className="h-4 w-4 inline mr-2" />
                    {selectedMessage.email}
                  </div>
                  {selectedMessage.phone && (
                    <div className="text-gray-600">
                      <span className="inline-block w-6 mr-2">📞</span>
                      {selectedMessage.phone}
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Received {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{selectedMessage.message}</div>

                <div className="mt-4 text-sm text-gray-500">
                  {selectedMessage.read ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Read
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-blue-600 rounded-full mr-1"></span>
                      New
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
