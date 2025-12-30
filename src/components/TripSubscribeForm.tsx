"use client";
import { useState } from "react";

export default function TripSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: data.message || "Subscribed successfully!" });
        setEmail("");
      } else {
        setStatus({ type: "error", message: data.error || "Subscription failed." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md bg-white rounded-xl shadow-md p-2 border border-gray-200">
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email to subscribe"
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" /></svg>
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
      {status && (
        <div className={`w-full mt-2 text-center rounded-lg px-4 py-2 text-sm font-semibold ${status.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}
