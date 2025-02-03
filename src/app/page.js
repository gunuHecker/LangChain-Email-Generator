"use client";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  useEffect(() => {
    toast.success("Welcome to AI Email Generator!", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#4CAF50",
        color: "#FFFFFF",
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to AI Email Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create professional, personalized emails in seconds with our
          cutting-edge AI technology. Whether you need a meeting request,
          follow-up, or thank-you email, we make it easy and efficient. Save
          time and make a lasting impression with every email you send.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Log In
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Fast & Efficient
            </h2>
            <p className="text-gray-600">
              Generate emails in seconds, saving you time and effort.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Professional Tone
            </h2>
            <p className="text-gray-600">
              Ensure your emails always sound polished and professional.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Customizable
            </h2>
            <p className="text-gray-600">
              Tailor your emails to suit your specific needs and audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}