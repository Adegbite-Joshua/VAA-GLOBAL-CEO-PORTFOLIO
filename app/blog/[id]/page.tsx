import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Edit } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"}/api/blog/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      notFound()
    }

    const { post } = await response.json()

    if (!post) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article */}
          <article className="max-w-4xl mx-auto">
            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Post Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                {post.featured && <Badge variant="default">Featured</Badge>}
                {!post.published && <Badge variant="destructive">Draft</Badge>}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching post:", error)
    notFound()
  }
}
