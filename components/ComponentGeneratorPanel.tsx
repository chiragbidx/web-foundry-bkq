"use client";

import { useState } from "react";

// Utility to strip ```
function stripCodeFences(str: string | undefined) {
  if (!str) return "";
  // Handles ```html ... ``` and generic ```
  return str
    .replace(/```(html|jsx)?\s*/gi, "")
    .replace(/```/g, "")
    .trim();
}

export default function ComponentGeneratorPanel() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    react: string;
    html: string;
    error?: string;
  } | null>(null);

  // For copy feedback UX
  const [copied, setCopied] = useState<null | "react" | "html">(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/component-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ react: "", html: "", error: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(type: "react" | "html") {
    if (!result) return;
    const clean =
      type === "html"
        ? stripCodeFences(result.html)
        : stripCodeFences(result.react);
    await navigator.clipboard.writeText(clean);
    setCopied(type);
    setTimeout(() => setCopied(null), 1300);
  }

  const cleanReact = stripCodeFences(result?.react);
  const cleanHtml = stripCodeFences(result?.html);

  return (
    <form
      onSubmit={handleGenerate}
      className="flex flex-col gap-4"
      aria-label="UI Component Generator"
    >
      <label htmlFor="component-desc" className="text-sm font-medium text-[#4b1f0a]">
        What component do you want to generate? Describe it briefly.
      </label>
      <textarea
        id="component-desc"
        className="min-h-[80px] w-full rounded-lg border border-[#fb7232]/30 bg-white px-3 py-2 text-sm text-[#33170a] outline-none ring-0 transition focus:border-[#fb7232] focus:shadow-[0_0_0_2px_rgba(251,114,50,0.12)]"
        placeholder='e.g. "A primary button with rounded edges and a subtle hover effect."'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md disabled:opacity-50"
        disabled={loading || !description.trim()}
      >
        {loading ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-b-0 border-[#fff] rounded-full"></span>
            Generating...
          </>
        ) : (
          "Generate Code"
        )}
      </button>
      {result && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-[#c75829]">React (JSX)</span>
                <button
                  type="button"
                  onClick={() => handleCopy("react")}
                  className="text-xs px-2 py-1 rounded bg-[#ffede5] text-[#fb7232] font-semibold transition hover:bg-[#fb7232] hover:text-white"
                >
                  {copied === "react" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-zinc-50 rounded-lg p-3 text-xs overflow-x-auto border border-[#fb7232]/15 text-[#2d2022]">
                {cleanReact}
              </pre>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-[#c75829]">HTML</span>
                <button
                  type="button"
                  onClick={() => handleCopy("html")}
                  className="text-xs px-2 py-1 rounded bg-[#ffede5] text-[#fb7232] font-semibold transition hover:bg-[#fb7232] hover:text-white"
                >
                  {copied === "html" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-zinc-50 rounded-lg p-3 text-xs overflow-x-auto border border-[#fb7232]/15 text-[#2d2022]">
                {cleanHtml}
              </pre>
            </div>
          </div>
          {/* Live Preview */}
          {cleanHtml && !result.error && (
            <div className="mt-2 p-4 rounded-lg border border-[#fb7232]/25 bg-[#fff5ee]">
              <label className="block mb-2 text-xs font-semibold text-[#fb7232] uppercase tracking-wider">
                Live Preview
              </label>
              <div
                className="relative w-full min-h-[40px] p-4 rounded-md bg-white border border-[#fb7232]/15 overflow-x-auto"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: cleanHtml }}
              />
              <div className="mt-1 text-[10px] text-[#c75829] opacity-80">
                (AI-generated content; preview is static and not sanitized. Only use for trusted UI prototyping.)
              </div>
            </div>
          )}
        </>
      )}
      {result?.error && (
        <div className="mt-2 text-xs text-red-500 font-medium">{result.error}</div>
      )}
    </form>
  );
}