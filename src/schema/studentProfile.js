import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    headline: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    learningGoals: {
      type: [String],
      default: []
    },

    preferredTechStack: {
      type: [String],
      default: []
    },

    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },

    interests: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);