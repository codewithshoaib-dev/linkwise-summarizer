"use client";

import { useState } from "react";
import LinkCard from "@/components/LinkCard";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setResults([]);
    setLoading(true);

    try {
      const list = urls
        .split(/[\s\n]+/)
        .map((u) => u.trim())
        .filter((u) => /^https?:\/\//.test(u));

      if (!list.length) {
        toast.error("Please enter at least one valid URL.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: list }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Summaries generated successfully!");
        setResults(data.results);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-neutral-100 text-gray-900">
      <Toaster position="top-center" richColors />

      {/* Left panel */}
      <section className="md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white border-r border-gray-200">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            LinkWise <span className="text-gray-500">Summarizer</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Paste one or more links (space or newline separated) to get concise,
            smart summaries.
          </p>

          <div className="bg-gray-50 rounded-2xl shadow-sm p-5 border border-gray-200">
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://vercel.com https://nextjs.org ..."
              className="w-full p-3 rounded-md text-[1rem] bg-white border border-gray-300 focus:ring-2 focus:ring-gray-800 outline-none resize-none h-28"
            />
            <button
              onClick={handleSummarize}
              name="summarize"
              disabled={loading}
              className="mt-4 w-full bg-gray-900 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? "Summarizing..." : "Summarize Links"}
            </button>
          </div>
        </div>
      </section>

      {/* Right panel (scrollable cards) */}
      <section className="md:w-1/2 flex flex-col px-8 py-10 overflow-y-auto max-h-screen bg-neutral-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center md:text-left">
          Summaries
        </h2>
        {results.length === 0 ? (
          <p className="text-gray-500 text-center md:text-left">
            No summaries yet. Paste links and click summarize.
          </p>
        ) : (
          <div className="space-y-5">
            {results.map((r, i) => (
              <LinkCard key={i} data={r} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
