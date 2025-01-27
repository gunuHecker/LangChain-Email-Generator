import mongoose, { Schema } from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "No user found"],
    },
    recipientName: {
      type: String,
      required: [true, "Please provide recipient name"],
    },
    purpose: {
      type: String,
      required: [true, "Please provide mail purpose"],
      enum: ["Meeting Request", "Follow Up", "Thank You"],
    },
    keyPoints: {
      type: String,
      required: [true, "Please provide key points of the mail"],
    },
    mail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.models.responses || mongoose.model("responses", responseSchema);

export default Response;
