import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    topic: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    scheduledAt: {
      type: Date,
      required: true
    },

    duration: {
      type: Number,
      default: 60
    },

    meetingLink: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
      ],
      default: "Pending"
    },

    price: {
      type: Number,
      default: 0
    }

  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);