"use client";

import { useState } from "react";

export default function EmailForm({ onSubmit }) {
  const [recipientName, setRecipientName] = useState("");
  const [emailPurpose, setEmailPurpose] = useState("");
  const [keyPoints, setKeyPoints] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ recipientName, emailPurpose, keyPoints });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Recipient Name:</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
          className="text-black w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block">Email Purpose:</label>
        <select
          value={emailPurpose}
          onChange={(e) => setEmailPurpose(e.target.value)}
          required
          className="text-black w-full p-2 border rounded"
        >
          <option value="">Select Purpose</option>
          <option value="Meeting Request">Meeting Request</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Thank You">Thank You</option>
        </select>
      </div>
      <div>
        <label className="block">Key Points:</label>
        <textarea
          value={keyPoints}
          onChange={(e) => setKeyPoints(e.target.value)}
          required
          className="text-black w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Generate Email
      </button>
    </form>
  );
}
