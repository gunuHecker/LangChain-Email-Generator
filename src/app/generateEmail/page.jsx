"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailForm from "@/components/EmailForm";

export default function GenerateEmail() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setIsLoading(true); // Start loading
    try {
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLogout = async () => {
    try {
      // Optional: Add API call to handle server-side logout if needed
      await fetch("/api/users/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Professional Email Generator
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Email Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-black">
          <EmailForm onSubmit={handleSubmit} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-800">Generating...</p>
          </div>
        )}

        {/* Generated Email Section */}
        {!isLoading && generatedEmail && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Generated Email:
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <pre className="whitespace-pre-wrap text-gray-800">
                {generatedEmail}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
