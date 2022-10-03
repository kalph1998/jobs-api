import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please enter company name"],
      max: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      max: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide a user"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Job", JobSchema);
