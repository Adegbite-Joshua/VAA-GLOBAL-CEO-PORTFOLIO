"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Mail, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UnsubscribePage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const token = searchParams.get("token")
    if (token) {
      try {
        const decodedEmail = Buffer.from(token, "base64").toString("utf-8")
        setEmail(decodedEmail)
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }
  }, [searchParams])

  const handleUnsubscribe = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while processing your request")
    } finally {
      setLoading(false)
    }
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Unsubscribe</CardTitle>
            <CardDescription className="text-gray-600">
              We're sorry to see you go. You can unsubscribe from our newsletter below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === "idle" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full"
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={handleUnsubscribe}
                  disabled={loading || !email}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loading ? "Processing..." : "Unsubscribe"}
                </Button>
                <div className="text-center">
                  <Button variant="ghost" onClick={handleGoHome} className="text-sm text-gray-500 hover:text-gray-700">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Home
                  </Button>
                </div>
              </>
            )}

            {status === "success" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Successfully Unsubscribed</h3>
                  <p className="text-gray-600 text-sm">{message}</p>
                </div>
                <div className="pt-4">
                  <Button onClick={handleGoHome} className="bg-orange-600 hover:bg-orange-700 text-white">
                    Back to Home
                  </Button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Unsubscribe Failed</h3>
                  <p className="text-gray-600 text-sm">{message}</p>
                </div>
                <div className="pt-4 space-y-2">
                  <Button
                    onClick={() => {
                      setStatus("idle")
                      setMessage("")
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Try Again
                  </Button>
                  <Button onClick={handleGoHome} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Back to Home
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">If you have any questions, please contact our support team.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
