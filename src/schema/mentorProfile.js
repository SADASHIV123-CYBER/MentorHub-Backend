import mongoose from "mongoose";

const mentorProfileSchema = new mongoose.Schema(
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
      index: true
    },

    experience: {
      type: Number,
      default: 0,
    },

    pricePerSession: {
      type: Number,
      default: 0,
    },

    languages: {
      type: [String],
      default: ["English"],
    },

    availability: [
      {
        day: String,
        slots: [String]
      }
    ],

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0
    },

    totalSessions: {
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