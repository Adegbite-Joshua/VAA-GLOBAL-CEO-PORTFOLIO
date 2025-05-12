import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "./cloudinary"

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ceo-portfolio",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf", "mp4"],
    resource_type: "auto",
  } as any,
})

// Create multer upload instance
const upload = multer({ storage })

export default upload
