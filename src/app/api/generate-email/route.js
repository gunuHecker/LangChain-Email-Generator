import { connect } from "@/dbConfig/dbConfig";
import Response from "@/models/responseModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/userModel";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

connect();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request) {
  try {
    const { recipientName, emailPurpose, keyPoints } = await request.json();

    // ✅ Properly await cookies retrieval
    const userId = (await cookies()).get("userId")?.value;
    if (!userId) {
      return NextResponse.json(
        { error: "Failed to get user ID" },
        { status: 504 }
      );
    }

    // ✅ Fetch user details from database
    const loggedInUser = await User.findById(userId);
    if (!loggedInUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const fullname = loggedInUser.username;
    const emailId = loggedInUser.email;

    // ✅ Structured prompt
    const promptTemplate = ChatPromptTemplate.fromTemplate(
      `Write a professional and polite email. 
      - **Purpose**: {emailPurpose}  
      - **Recipient**: {recipientName}  
      - **Key Points**: {keyPoints}  
      - **Sender Name (if missing)**: {fullname}  
      - **Sender Contact (if missing)**: {emailId}  
      Format the response as an email with a greeting, body, and closing.`
    );

    const prompt = await promptTemplate.format({
      emailPurpose,
      recipientName,
      keyPoints,
      fullname,
      emailId,
    });

    // ✅ Use LangChain to call Gemini API (Using `gemini-2.0-flash`)
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.0-flash", // ✅ Use the faster model
      apiKey: GEMINI_API_KEY,
      maxOutputTokens: 500,
      // apiVersion: "v1", // ✅ Ensure correct API version
    });

    const response = await model.invoke(prompt);

    if (!response || !response.content) {
      throw new Error("Failed to generate email.");
    }

    const email = response.content;

    // ✅ Save to Database
    const newResponse = new Response({
      userId,
      recipientName,
      purpose: emailPurpose,
      keyPoints,
      mail: email,
    });

    await newResponse.save();

    return NextResponse.json({ email });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}
