"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Send, Users, ArrowLeft, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"
import Link from "next/link"

interface Subscriber {
  _id: string
  email: string
  active: boolean
}

export default function NewsletterPage() {
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchActiveSubscribers()
  }, [])

  const fetchActiveSubscribers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/subscribers?active=true")
      const data = await response.json()
      setSubscribers(data.subscribers || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscribers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendNewsletter = async () => {
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please provide both subject and content",
        variant: "destructive",
      })
      return
    }

    if (subscribers.length === 0) {
      toast({
        title: "Error",
        description: "No active subscribers found",
        variant: "destructive",
      })
      return
    }

    try {
      setSending(true)
      const response = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          content,
          recipients: subscribers.map((sub) => sub.email),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `Newsletter sent to ${data.sentCount} subscribers`,
        })
        setSubject("")
        setContent("")
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send newsletter",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send newsletter",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  }

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
  ]

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/admin/subscribers"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subscribers
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Send Newsletter</h1>
            <p className="text-muted-foreground">Compose and send newsletter to your subscribers</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Subscriber Stats */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Active Subscribers
          </CardTitle>
          <CardDescription>Your newsletter will be sent to these active subscribers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">{subscribers.length}</div>
              <div className="text-sm text-muted-foreground">Active subscribers</div>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Ready to send</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compose Newsletter</CardTitle>
            <CardDescription>Create your newsletter content using the rich text editor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter newsletter subject..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="content">Newsletter Content</Label>
              <div className="mt-1 border rounded-md">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your newsletter content here..."
                  style={{ height: "300px", marginBottom: "42px" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Preview how your newsletter will look to subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
              {subject && (
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{subject}</h2>
                  <hr className="mt-2 mb-4" />
                </div>
              )}
              {content ? (
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div className="text-gray-500 italic">Your newsletter content will appear here...</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle>Send Newsletter</CardTitle>
          <CardDescription>Review and send your newsletter to all active subscribers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                This newsletter will be sent individually to {subscribers.length} active subscribers. Each subscriber
                will receive a personalized email.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={!subject.trim() || !content.trim() || subscribers.length === 0 || sending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? "Sending..." : "Send Newsletter"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Send Newsletter</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to send this newsletter to {subscribers.length} active subscribers? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSendNewsletter} className="bg-purple-600 hover:bg-purple-700">
                    Send Newsletter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
