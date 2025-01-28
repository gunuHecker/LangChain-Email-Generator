import { connect } from "@/dbConfig/dbConfig";
import Response from "@/models/responseModel";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { cookies } from "next/headers";
import User from "@/models/userModel";

connect();

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function POST(request) {
  try {
    const { recipientName, emailPurpose, keyPoints } = await request.json();

    // Access cookies safely using Next.js API
    const userId = cookies().get("userId")?.value;

    if (!userId) {
      console.error("User ID is missing in the request.");
      return NextResponse.json(
        { error: "Failed to get user Id" },
        { status: 504 }
      );
    }

    let fullname;
    let emailId;
    try {
      const loggedInUser = await User.findById(userId);
      if (!loggedInUser) {
        console.error("No user found with the provided user ID.");
        return;
      }

      fullname = loggedInUser.username;
      emailId = loggedInUser.email;
      console.log("fullname: ", fullname);
      console.log("emailId: ", emailId);
    } catch (error) {
      console.error("An error occurred while fetching the user:", error);
    }

    // Define the prompt for Qwen2.5-Coder model
    const prompt = `Write a professional, polite, conckse, short email for the purpose of ${emailPurpose}. Recipient: ${recipientName}. Key points to include: ${keyPoints}. If I have not provided full name then consider my full name: ${fullname}. If contact information not provided consider my contact information: ${emailId}`;

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

      const newResponse = new Response({
        userId: request.userId,
        recipientName: recipientName,
        purpose: emailPurpose,
        keyPoints: keyPoints,
        mail: email,
      });

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
