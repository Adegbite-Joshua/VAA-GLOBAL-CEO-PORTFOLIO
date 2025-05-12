import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import multer from "multer"
import type { NextApiRequest } from "next"
import { Readable } from "stream"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Helper function to convert ReadableStream to Node.js Readable
function streamToNodeReadable(stream: ReadableStream) {
  const reader = stream.getReader()
  const nodeReadable = new Readable({
    async read() {
      try {
        const { done, value } = await reader.read()
        if (done) {
          this.push(null)
        } else {
          this.push(Buffer.from(value))
        }
      } catch (err) {
        this.destroy(err as Error)
      }
    },
  })
  return nodeReadable
}

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
})

// Helper function to run multer middleware
function runMiddleware(req: NextApiRequest, middleware: any) {
  return new Promise((resolve, reject) => {
    middleware(req, {} as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function POST(request: Request) {
  try {
    // Get the content type
    const contentType = request.headers.get("content-type") || ""

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Content type must be multipart/form-data" }, { status: 400 })
    }

    // Convert the request to a Node.js readable stream for multer
    const nodeReadable = streamToNodeReadable(request.body as ReadableStream)

    // Create a mock request object for multer
    const mockReq = {
      headers: {
        "content-type": contentType,
      },
      pipe: (destination: any) => {
        nodeReadable.pipe(destination)
        return destination
      },
    } as unknown as NextApiRequest

    // Run multer middleware
    await runMiddleware(mockReq, upload.single("file"))

    // Get the file from multer
    const file = (mockReq as any).file

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Upload to Cloudinary
    const folder = request.nextUrl.searchParams.get("folder") || "ceo-portfolio"

    // Convert buffer to base64 for Cloudinary upload
    const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`

    const result = await cloudinary.uploader.upload(base64Data, {
      folder,
      resource_type: "auto",
    })

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
