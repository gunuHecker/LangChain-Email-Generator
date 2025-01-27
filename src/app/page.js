"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Introduction Section */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to AI Email Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Our platform uses advanced AI technology to help you create
          professional and personalized emails in seconds. Whether you need a
          meeting request, follow-up, or thank-you email, we've got you covered!
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Log In
          </Link>
        </div>

        {/* Optional: Add a small image or illustration */}
        {/* <div className="mt-12">
          <img
            src="/images/ai-email.png" // Replace with your image path
            alt="AI Email Generator"
            className="w-64 mx-auto"
          />
        </div> */}
      </div>
    </div>
  );
}
