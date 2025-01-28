import { connect } from "@/dbConfig/dbConfig";
import Response from "@/models/responseModel";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

connect();

// Use Hugging Face's Inference API for GPT-Neo model
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(request) {
  try {
    const { recipientName, emailPurpose, keyPoints } = await request.json();

    // Define the prompt for Qwen2.5-Coder model
    const prompt = `Write a professional short email for the purpose of ${emailPurpose}. Recipient: ${recipientName}. Key points to include: ${keyPoints}.`;

    // Call Hugging Face Inference API with Qwen2.5-Coder-32B-Instruct

    const client = new HfInference(HUGGING_FACE_API_KEY);
    const chatCompletion = await client.chatCompletion({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      provider: "hf-inference",
      max_tokens: 500,
    });

    if (
      chatCompletion &&
      chatCompletion.choices &&
      chatCompletion.choices.length > 0
    ) {
      const email = chatCompletion.choices[0].message.content;

      // Create a new user
      const newResponse = new Response({
        userId: request.userId,
        recipientName: recipientName,
        purpose: emailPurpose,
        keyPoints: keyPoints,
        mail: email,
      });

      // Save the user to the database
      const savedResponse = await newResponse.save();

      return NextResponse.json({ email });
    } else {
      throw new Error("Failed to generate email");
    }
  }
  catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}
