"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function NewPostModal({ onClose, onCreate }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !message) return;
    onCreate({ title, message, owner: user.id });
    setTitle("");
    setMessage("");
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-lg text-gray-900 font-bold mb-4">
          Create New Post
        </h2>
        <input
          className="w-full border text-gray-900 border-gray-400 rounded px-3 py-2 mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border text-gray-900 border-gray-400 rounded px-3 py-2 mb-3"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
