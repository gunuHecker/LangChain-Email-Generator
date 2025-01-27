"use client";

import { useState } from "react";
import EmailForm from "@/components/EmailForm";

export default function Home() {
  const [generatedEmail, setGeneratedEmail] = useState("");

  const handleSubmit = async (formData) => {
    const response = await fetch("/api/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const { email } = await response.json();
      setGeneratedEmail(email);
    } else {
      console.error("Failed to generate email");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Professional Email Generator</h1>
      <EmailForm onSubmit={handleSubmit} />
      {generatedEmail && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-black">Generated Email:</h2>
          <pre className="whitespace-pre-wrap text-black">{generatedEmail}</pre>
        </div>
      )}
    </div>
  );
}
