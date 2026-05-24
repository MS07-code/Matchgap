import { useState } from "react"

async function askClaude(question, background) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: `You are a compassionate, knowledgeable assistant helping people understand bone marrow donation. The user's background is: ${background || "unspecified"}. Answer questions about the donation process, address cultural or religious concerns, and explain medical facts clearly. Be warm, honest, and encouraging. Keep answers concise, 2-4 sentences max. Never pressure anyone. Always respect their concerns.`,
      messages: [{ role: "user", content: question }],
    }),
  })
  const data = await response.json()
  return data.content[0].text
}

function Ask() {
  const [background, setBackground] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleAsk() {
    if (!question.trim()) return
    setLoading(true)
    setAnswer("")
    const result = await askClaude(question, background)
    setAnswer(result)
    setLoading(false)
  }

  const suggestions = [
    "Is donation painful?",
    "What does my religion say about this?",
    "How long does recovery take?",
    "Will this affect my health long term?",
    "What if I get called and change my mind?",
    "How does the matching process work?",
  ]

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0f4c75 0%, #0d9488 100%)", padding: "4rem 1.5rem", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "1rem" }}>
          Ask anything
        </h1>
        <p style={{ opacity: 0.85, fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
          No question is too small. Get honest, compassionate answers about what donation really involves.
        </p>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ background: "white", borderRadius: "20px", padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginTop: "-3rem", position: "relative" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#555" }}>
            Your background (optional — helps personalize answers)
          </label>
          <select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            style={{ width: "100%", padding: "0.75rem 1rem", fontSize: "0.95rem", borderRadius: "12px", border: "2px solid #e9e9e9", background: "#faf7f2", cursor: "pointer", outline: "none", marginBottom: "1.5rem" }}
          >
            <option value="">-- Select background --</option>
            <option>White / Caucasian</option>
            <option>Hispanic / Latino</option>
            <option>Black / African American</option>
            <option>Asian / Pacific Islander</option>
            <option>South Asian</option>
            <option>Middle Eastern</option>
            <option>Mixed / Multiracial</option>
            <option>Native American</option>
          </select>

          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.75rem", fontSize: "0.9rem", color: "#555" }}>
            Common questions
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuestion(s)}
                style={{ background: "#f0fdfa", border: "1px solid #0d9488", color: "#0d9488", borderRadius: "99px", padding: "0.4rem 0.9rem", fontSize: "0.85rem", cursor: "pointer", fontWeight: "500" }}
              >
                {s}
              </button>
            ))}
          </div>

          <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#555" }}>
            Your question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows={4}
            style={{ width: "100%", padding: "0.85rem 1rem", fontSize: "0.95rem", borderRadius: "12px", border: "2px solid #e9e9e9", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", outline: "none" }}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{ marginTop: "0.75rem", width: "100%", padding: "1rem", fontSize: "1rem", fontWeight: "700", background: loading ? "#ccc" : "#0d9488", color: "white", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {answer && (
            <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "#f0fdfa", borderRadius: "12px", borderLeft: "4px solid #0d9488" }}>
              <p style={{ margin: 0, lineHeight: "1.8", fontSize: "0.95rem" }}>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Ask
