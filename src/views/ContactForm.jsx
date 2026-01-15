"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Auto-hide success/error message after 5 seconds
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const now = new Date();
    const time = now.toLocaleString();

    emailjs
      .sendForm(
        "service_9bftb08",
        "template_2g55dgn",
        form.current,
        "vRSgbpKKzCNs-Ya7r",
        { time }
      )
      .then(
        () => {
          setResult({ success: true, message: "Message sent successfully!" });
          form.current.reset();
        },
        () => {
          setResult({
            success: false,
            message: "Failed to send message. Please try again.",
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-2 space-x-2">
      <div>
        <label className="block text-blue-700 font-medium mb-2">Name</label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition-colors"
          placeholder="your@example.com"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-medium mb-2">Subject</label>
        <input
          name="title"
          type="text"
          required
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition-colors"
          placeholder="Subject"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-medium mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
          placeholder="Tell me about your required..."
        />
      </div>
      <motion.button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </motion.button>
      {result && (
        <div
          className={`mt-4 text-center font-medium ${
            result.success ? "text-teal-800" : "text-red-400"
          }`}
        >
          {result.message}
        </div>
      )}
    </form>
  );
}