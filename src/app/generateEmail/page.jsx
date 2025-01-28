"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EmailForm from "@/components/EmailForm";
import toast from "react-hot-toast";

export default function GenerateEmail() {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
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
        toast.success("Email generated successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#4CAF50",
            color: "#FFFFFF",
          },
        });
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Failed to generate email. Please try again.",
          {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#FF5252",
              color: "#FFFFFF",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#FF5252",
          color: "#FFFFFF",
        },
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", { method: "POST" });
      if (response.ok) {
        toast.success("Logged out successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#4CAF50",
            color: "#FFFFFF",
          },
        });
        router.push("/");
      } else {
        toast.error("Failed to log out. Please try again.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#FF5252",
            color: "#FFFFFF",
          },
        });
      }
    } catch (error) {
      console.error("Failed to log out", error);
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#FF5252",
          color: "#FFFFFF",
        },
      });
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