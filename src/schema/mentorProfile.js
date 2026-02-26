import mongoose from "mongoose";

const mentorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    headline: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    pricePerSession: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    experience: {
      type: Number,
      default: 0
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const MentorProfile = mongoose.model(
  "MentorProfile",
  mentorProfileSchema
);
