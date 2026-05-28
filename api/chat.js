/**
 * Vercel serverless function — proxies requests to the Anthropic API.
 * The API key lives in ANTHROPIC_API_KEY (server-side only, never VITE_*).
 * This file is the only place the key is used; the browser never sees it.
 */

const ALLOWED_BACKGROUNDS = [
  "White / Caucasian",
  "Hispanic / Latino",
  "Black / African American",
  "Asian / Pacific Islander",
  "South Asian",
  "Middle Eastern",
  "Mixed / Multiracial",
  "Native American",
  "",
]

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, background, lang } = req.body ?? {}

  // --- Input validation ---
  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "question is required" })
  }
  if (question.length > 500) {
    return res.status(400).json({ error: "question must be 500 characters or fewer" })
  }
  if (background !== undefined && !ALLOWED_BACKGROUNDS.includes(background)) {
    return res.status(400).json({ error: "invalid background value" })
  }
  if (lang !== undefined && lang !== "en" && lang !== "es") {
    return res.status(400).json({ error: "lang must be 'en' or 'es'" })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set")
    return res.status(500).json({ error: "Server misconfiguration" })
  }

  const langInstruction =
    lang === "es" ? " Please respond entirely in Spanish." : ""

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system: `You are a compassionate, knowledgeable assistant helping people understand bone marrow donation. The user's background is: ${background || "unspecified"}. Answer questions about the donation process, address cultural or religious concerns, and explain medical facts clearly. Be warm, honest, and encouraging. Keep answers concise, 2-4 sentences max. Never pressure anyone. Always respect their concerns.${langInstruction}`,
        messages: [{ role: "user", content: question.trim() }],
      }),
    })

    if (!upstream.ok) {
      const body = await upstream.json().catch(() => ({}))
      console.error("Anthropic error:", upstream.status, body)
      return res
        .status(upstream.status >= 500 ? 502 : upstream.status)
        .json({ error: body.error?.message ?? "Upstream API error" })
    }

    const data = await upstream.json()
    return res.status(200).json({ answer: data.content[0].text })
  } catch (err) {
    console.error("chat handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
