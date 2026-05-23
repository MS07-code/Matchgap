import { useState } from "react"

const matchData = {
  "White / Caucasian": { probability: 79, patients: 1200 },
  "Hispanic / Latino": { probability: 46, patients: 3400 },
  "Black / African American": { probability: 29, patients: 5800 },
  "Asian / Pacific Islander": { probability: 47, patients: 2100 },
  "South Asian": { probability: 48, patients: 1900 },
  "Middle Eastern": { probability: 43, patients: 890 },
  "Mixed / Multiracial": { probability: 22, patients: 4200 },
  "Native American": { probability: 32, patients: 670 },
}

const stories = {
  "Hispanic / Latino": [
    { name: "Maria, 28", location: "Texas", quote: "I was nervous about what my family would think. But when I explained it to my abuela, she cried and said it was the most beautiful thing I could do." },
    { name: "Carlos, 34", location: "California", quote: "The process was easier than I expected. I took a week off work and was back to normal quickly. The family I helped will never know me but I think about them every day." },
  ],
  "Black / African American": [
    { name: "Jasmine, 25", location: "Georgia", quote: "Black patients have the hardest time finding matches. When I learned that, I signed up immediately. It took 2 years but I finally got the call." },
    { name: "DeShawn, 31", location: "Illinois", quote: "My pastor initially had concerns but after we researched it together he supported me completely. Our whole church group signed up." },
  ],
  "South Asian": [
    { name: "Priya, 27", location: "New Jersey", quote: "My parents were worried at first — they didn't understand the process. Once I showed them the research they became my biggest supporters." },
    { name: "Arjun, 33", location: "Washington", quote: "I donated for a South Asian child who had almost no other options. Knowing that is something I carry with me every single day." },
  ],
  "Asian / Pacific Islander": [
    { name: "Michelle, 29", location: "Hawaii", quote: "Growing up I never thought about this. Then a friend's cousin needed a match and couldn't find one. I registered that same week." },
    { name: "Kevin, 26", location: "New York", quote: "The donation itself was painless. The hardest part was waiting to hear if the patient recovered. They did." },
  ],
  "Middle Eastern": [
    { name: "Lena, 30", location: "Michigan", quote: "I asked my imam about it and he said saving a life is one of the highest acts in Islam. That was all I needed to hear." },
    { name: "Omar, 35", location: "Virginia", quote: "Our community is so underrepresented in the registry. I tell everyone I know — this is one of the most direct ways to save a life." },
  ],
  "Mixed / Multiracial": [
    { name: "Sofia, 24", location: "Florida", quote: "Being mixed means I'm rare in the registry — which also means I might be someone's only chance. That responsibility means everything to me." },
    { name: "Jordan, 29", location: "Oregon", quote: "Mixed race patients have the worst odds of finding a match. As a mixed person myself, registering felt like the most obvious thing I could do." },
  ],
  "Native American": [
    { name: "Kai, 32", location: "New Mexico", quote: "Our elders teach us to take care of each other. This is just an extension of that value in a modern way." },
    { name: "Ayasha, 27", location: "Montana", quote: "Native patients are among the hardest to match. I registered because I want future generations to have better odds than we do now." },
  ],
  "White / Caucasian": [
    { name: "Sarah, 26", location: "Ohio", quote: "I registered at a college drive and forgot about it for three years. Then I got the call. Being someone's match was surreal." },
    { name: "Tom, 38", location: "Minnesota", quote: "It took about a week to fully recover. Knowing a stranger is alive because of me is something I can't put into words." },
  ],
}

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
      system: `You are a compassionate, knowledgeable assistant helping people understand bone marrow donation. 
      The user's background is: ${background || "unspecified"}.
      Answer questions about the donation process, address cultural or religious concerns, and explain medical facts clearly.
      Be warm, honest, and encouraging. Keep answers concise — 2-4 sentences max.
      Never pressure anyone. Always respect their concerns.`,
      messages: [{ role: "user", content: question }],
    }),
  })
  const data = await response.json()
  return data.content[0].text
}

function StoryCard({ name, location, quote }) {
  return (
    <div style={{ background: "#f9f9f9", borderRadius: "12px", padding: "1.25rem", borderLeft: "4px solid #2c3e50" }}>
      <p style={{ margin: "0 0 0.75rem", lineHeight: "1.6", color: "#333", fontStyle: "italic" }}>"{quote}"</p>
      <p style={{ margin: 0, fontWeight: "600", fontSize: "0.9rem", color: "#2c3e50" }}>{name} · {location}</p>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const data = matchData[selected]
  const communityStories = stories[selected] || []

  async function handleAsk() {
    console.log("API KEY:", import.meta.env.VITE_ANTHROPIC_API_KEY)
    if (!question.trim()) return
    setLoading(true)
    setAnswer("")
    const result = await askClaude(question, selected)
    setAnswer(result)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>MatchGap</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        See how hard it is for someone like you to find a bone marrow match.
      </p>

      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
        Select your background
      </label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
      >
        <option value="">-- Choose your ethnicity --</option>
        {Object.keys(matchData).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      {data && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700", color: data.probability < 40 ? "#c0392b" : data.probability < 60 ? "#e67e22" : "#27ae60" }}>
                {data.probability}%
              </div>
              <div style={{ color: "#666", marginTop: "0.5rem" }}>chance of finding a match</div>
            </div>
            <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700", color: "#2c3e50" }}>
                {data.patients.toLocaleString()}
              </div>
              <div style={{ color: "#666", marginTop: "0.5rem" }}>patients like you searching now</div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "#fff8e1", borderRadius: "12px", borderLeft: "4px solid #f39c12" }}>
            <p style={{ margin: 0, color: "#7d6608" }}>
              The average match probability for white patients is <strong>79%</strong>.
              For {selected} patients it is <strong>{data.probability}%</strong>.
              Every donor from your background closes this gap.
            </p>
          </div>

          {communityStories.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Donors from your community</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {communityStories.map((story, i) => (
                  <StoryCard key={i} {...story} />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>Have questions? Ask anything.</h2>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Try: "Is donation painful?" or "Does my religion allow this?" or "How long does it take?"
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              rows={3}
              style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", borderRadius: "8px", border: "1px solid #ccc", resize: "vertical", boxSizing: "border-box" }}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              style={{ marginTop: "0.75rem", width: "100%", padding: "1rem", fontSize: "1rem", fontWeight: "600", background: loading ? "#95a5a6" : "#2c3e50", color: "white", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Thinking..." : "Ask →"}
            </button>

            {answer && (
              <div style={{ marginTop: "1rem", padding: "1.25rem", background: "#f0f4f8", borderRadius: "12px" }}>
                <p style={{ margin: 0, lineHeight: "1.6" }}>{answer}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => window.open("https://bethematch.org/support-the-mission/donate-blood-stem-cells/join-the-marrow-registry/", "_blank")}
            style={{ marginTop: "1.5rem", width: "100%", padding: "1rem", fontSize: "1rem", fontWeight: "600", background: "#2c3e50", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}
          >
            Join the registry →
          </button>
        </div>
      )}
    </div>
  )
}

export default App