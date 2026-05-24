import { useState } from "react"

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
    { name: "Priya, 27", location: "New Jersey", quote: "My parents were worried at first. Once I showed them the research they became my biggest supporters." },
    { name: "Arjun, 33", location: "Washington", quote: "I donated for a South Asian child who had almost no other options. Knowing that is something I carry with me every single day." },
  ],
  "Asian / Pacific Islander": [
    { name: "Michelle, 29", location: "Hawaii", quote: "Growing up I never thought about this. Then a friend's cousin needed a match and could not find one. I registered that same week." },
    { name: "Kevin, 26", location: "New York", quote: "The donation itself was painless. The hardest part was waiting to hear if the patient recovered. They did." },
  ],
  "Middle Eastern": [
    { name: "Lena, 30", location: "Michigan", quote: "I asked my imam about it and he said saving a life is one of the highest acts in Islam. That was all I needed to hear." },
    { name: "Omar, 35", location: "Virginia", quote: "Our community is so underrepresented in the registry. I tell everyone I know this is one of the most direct ways to save a life." },
  ],
  "Mixed / Multiracial": [
    { name: "Sofia, 24", location: "Florida", quote: "Being mixed means I am rare in the registry which also means I might be someone's only chance. That responsibility means everything to me." },
    { name: "Jordan, 29", location: "Oregon", quote: "Mixed race patients have the worst odds of finding a match. As a mixed person myself, registering felt like the most obvious thing I could do." },
  ],
  "Native American": [
    { name: "Kai, 32", location: "New Mexico", quote: "Our elders teach us to take care of each other. This is just an extension of that value in a modern way." },
    { name: "Ayasha, 27", location: "Montana", quote: "Native patients are among the hardest to match. I registered because I want future generations to have better odds than we do now." },
  ],
  "White / Caucasian": [
    { name: "Sarah, 26", location: "Ohio", quote: "I registered at a college drive and forgot about it for three years. Then I got the call. Being someone's match was surreal." },
    { name: "Tom, 38", location: "Minnesota", quote: "It took about a week to fully recover. Knowing a stranger is alive because of me is something I cannot put into words." },
  ],
}

function StoryCard({ name, location, quote }) {
  return (
    <div style={{ background: "white", borderRadius: "16px", padding: "1.75rem", borderLeft: "4px solid #0d9488", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <p style={{ margin: "0 0 1.25rem", lineHeight: "1.8", color: "#333", fontStyle: "italic", fontSize: "1rem" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.9rem", fontWeight: "700", flexShrink: 0 }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{name}</div>
          <div style={{ fontSize: "0.8rem", color: "#888" }}>{location}</div>
        </div>
      </div>
    </div>
  )
}

function Stories() {
  const [selected, setSelected] = useState("All")
  const communities = ["All", ...Object.keys(stories)]
  const displayed = selected === "All" ? Object.values(stories).flat() : stories[selected] || []

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0f4c75 0%, #0d9488 100%)", padding: "4rem 1.5rem", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "1rem" }}>
          Stories from donors like you
        </h1>
        <p style={{ opacity: 0.85, fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
          Real people from underrepresented communities who decided to make a difference.
        </p>
      </div>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {communities.map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              style={{ padding: "0.5rem 1rem", borderRadius: "99px", fontSize: "0.85rem", fontWeight: "500", border: "1px solid #0d9488", cursor: "pointer", background: selected === c ? "#0d9488" : "white", color: selected === c ? "white" : "#0d9488", transition: "all 0.2s" }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {displayed.map((story, i) => (
            <StoryCard key={i} {...story} />
          ))}
        </div>
        <div style={{ marginTop: "3rem", background: "linear-gradient(135deg, #0f4c75, #0d9488)", borderRadius: "20px", padding: "2.5rem", textAlign: "center", color: "white" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.75rem" }}>Have a story to share?</h2>
          <p style={{ opacity: 0.85, marginBottom: "1.5rem", lineHeight: "1.6" }}>
            If you have donated or registered, your story could inspire someone from your community to do the same.
          </p>
          <a href="mailto:matchgap@gmail.com" style={{ background: "#f4a261", color: "white", borderRadius: "99px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", textDecoration: "none", display: "inline-block" }}>
            Share your story
          </a>
        </div>
      </div>
    </div>
  )
}

export default Stories
