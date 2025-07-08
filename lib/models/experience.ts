import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IExperience extends Document {
    _id?: string
    year: string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

const ExperienceSchema: Schema<IExperience> = new Schema(
    {
        year: {
            type: String,
            required: [true, "Year is required"],
            trim: true,
            maxlength: [50, "Year cannot exceed 50 characters"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
    },
    {
        timestamps: true,
    },
)

// Add indexes for better query performance
ExperienceSchema.index({ createdAt: -1 })
ExperienceSchema.index({ year: 1 })

// Prevent re-compilation during development
const Experience: Model<IExperience> =
    mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema)

export default Experience
