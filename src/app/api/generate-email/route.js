import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(request) {
  try {
    const { recipientName, emailPurpose, keyPoints } = await request.json();

    // Prompt for the Ollama model'
    const prompt = `Write a professional email for the purpose of ${emailPurpose}. Recipient: ${recipientName}. Key points to include: ${keyPoints}.`;

    const response = await ollama.generate({
      model: "llama2",
      prompt: prompt,
      stream: false,
    });

    const email = response.response;

    return NextResponse.json({ email });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}