import { connect } from "@/dbConfig/dbConfig";
import Response from "@/models/responseModel";
import { NextResponse } from "next/server";
import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { cookies } from "next/headers";
import User from "@/models/userModel";

connect();

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const LANGSMITH_API_KEY = process.env.LANGCHAIN_API_KEY;

export async function POST(request) {
  try {
    const { recipientName, emailPurpose, keyPoints } = await request.json();

    // Access cookies safely using Next.js API
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

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
      // console.log("fullname: ", fullname);
      // console.log("emailId: ", emailId);
      // console.log("userID: ", userId);
    } catch (error) {
      console.error("An error occurred while fetching the user:", error);
    }

    const model = new HuggingFaceInference({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      apiKey: HUGGING_FACE_API_KEY,
    });

    const model2 = new HuggingFaceInference({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      apiKey: HUGGING_FACE_API_KEY,
    });
    // Define the prompt for Qwen2.5-Coder model
    const prompt = `Write a professional, polite, conckse, short email for the purpose of ${emailPurpose}. Recipient: ${recipientName}. Key points to include: ${keyPoints}. If I have not provided full name then consider my full name: ${fullname}. If contact information not provided consider my contact information: ${emailId}`;

    const response = await model.invoke(prompt);
    console.log("First Response: ", response);

    const Prompt_2 = `I am giving you an AI response for an email. Extract the email from the response and provide it to me.`;
    const email = await model2.invoke(Prompt_2);

    console.log("Email: ", email);

    // const newResponse = new Response({
    //   userId: request.userId,
    //   recipientName: recipientName,
    //   purpose: emailPurpose,
    //   keyPoints: keyPoints,
    //   mail: email,
    // });

    // const savedResponse = await newResponse.save();
    return NextResponse.json({ email });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}