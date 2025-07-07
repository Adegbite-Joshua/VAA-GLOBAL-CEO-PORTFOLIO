"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Mail } from "lucide-react"

export default function UnsubscribeSuccessPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleResubscribe = () => {
    window.location.href = "/subscribe"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Successfully Unsubscribed</CardTitle>
            <CardDescription className="text-gray-600">
              {email
                ? `${email} has been removed from our newsletter list.`
                : "You have been unsubscribed from our newsletter."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• You won't receive any more newsletters from us</li>
                  <li>• Your email has been marked as inactive in our system</li>
                  <li>• You can resubscribe anytime if you change your mind</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button onClick={handleGoHome} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                <Button onClick={handleResubscribe} variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Changed your mind? Resubscribe
                </Button>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">We're sorry to see you go!</p>
              <p className="text-xs text-gray-500">
                If you have feedback on how we can improve our newsletter, please let us know.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
