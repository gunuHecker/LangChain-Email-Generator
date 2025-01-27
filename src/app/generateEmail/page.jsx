"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailForm from "@/components/EmailForm";

export default function Home() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      // Optional: Add API call to handle server-side logout if needed
      await fetch("/api/users/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Professional Email Generator</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <EmailForm onSubmit={handleSubmit} />
      {generatedEmail && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Generated Email:
          </h2>
          <pre className="whitespace-pre-wrap text-black">{generatedEmail}</pre>
        </div>
      )}
    </div>
  );
}
