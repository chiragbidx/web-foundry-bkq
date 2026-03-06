import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "The API is not configured. Please set your OPENAI_API_KEY." },
      { status: 500 }
    );
  }
  const { description } = await req.json();

  if (!description || typeof description !== "string" || !description.trim()) {
    return NextResponse.json(
      { error: "Description is required." },
      { status: 400 }
    );
  }

  // Compose prompt for OpenAI API for React and HTML code generation
  const prompt = `You are a UI developer assistant. The user will describe a component. 
Generate two code outputs:
1. A minimal, production-ready React functional component in JSX (with Tailwind CSS classes, functional where possible, no external dependencies, keep dumb stateless) — NO HTML in quotes, just raw code.
2. An equivalent HTML output (static). Wrap the result in <div>...</div> or the most appropriate HTML root.

Description: "${description}"

---OUTPUT FORMAT---
REACT:
<code>

HTML:
<code>
`;

  // Call OpenAI API (v1 completion/chat, use GPT-4 if possible)
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a senior frontend developer. Generate clean JSX and HTML for UI components as described."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.15,
      max_tokens: 900,
      n: 1
    })
  });

  if (!openaiRes.ok) {
    const error = await openaiRes.json().catch(() => ({}));
    return NextResponse.json(
      { error: error?.error?.message || "OpenAI API error" },
      { status: 500 }
    );
  }

  const aiJson = await openaiRes.json();
  const rawText: string =
    aiJson.choices?.[0]?.message?.content ?? "";

  // Parse out the two code blocks
  let react = "";
  let html = "";

  const reactMatch = rawText.match(/REACT:\s*([\s\S]*?)HTML:/i);
  const htmlMatch = rawText.match(/HTML:\s*([\s\S]*)/i);

  if (reactMatch) react = reactMatch[1].trim();
  if (htmlMatch) html = htmlMatch[1].trim();

  return NextResponse.json({ react, html });
}