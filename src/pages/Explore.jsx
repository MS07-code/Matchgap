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

function ProbabilityBar({ probability }) {
  const color = probability < 40 ? "#e63946" : probability < 60 ? "#f4a261" : "#2a9d8f"
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", color: "#888" }}>Match probability</span>
        <span style={{ fontSize: "1.1rem", fontWeight: "700", color }}>{probability}%</span>
      </div>
      <div style={{ background: "#e9e9e9", borderRadius: "99px", height: "12px", overflow: "hidden" }}>
        <div style={{ width: `${probability}%`, height: "100%", background: color, borderRadius: "99px", transition: "width 0.8s ease" }} />
      </div>
    </div>
  )
}

function Explore() {
  const [selected, setSelected] = useState("")
  const data = matchData[selected]

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "linear-gradient(135deg, #0f4c75 0%, #0d9488 100%)", padding: "4rem 1.5rem", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "1rem" }}>
          Your numbers
        </h1>
        <p style={{ opacity: 0.85, fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
          Select your background to see personalized match data and how many patients like you are searching right now.
        </p>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Dropdown card */}
        <div style={{ background: "white", borderRadius: "20px", padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginTop: "-3rem", position: "relative" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>Select your background</h2>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1rem" }}>We'll show you personalized data based on your ethnicity.</p>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{ width: "100%", padding: "0.85rem 1rem", fontSize: "1rem", borderRadius: "12px", border: "2px solid #e9e9e9", background: "#faf7f2", cursor: "pointer", outline: "none" }}
          >
            <option value="">-- Choose your background --</option>
            {Object.keys(matchData).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        {data && (
          <div>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
              <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <ProbabilityBar probability={data.probability} />
              </div>
              <div style={{ background: "#e63946", borderRadius: "16px", padding: "1.5rem", color: "white", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "800", fontFamily: "Fraunces, serif" }}>{data.patients.toLocaleString()}</div>
                <div style={{ fontSize: "0.85rem", opacity: 0.9, marginTop: "0.25rem" }}>patients like you searching now</div>
              </div>
            </div>

            {/* Callout */}
            <div style={{ background: "#fff8ee", border: "1px solid #f4a261", borderRadius: "16px", padding: "1.25rem 1.5rem", marginTop: "1rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
              <p style={{ margin: 0, color: "#7d4e00", lineHeight: "1.6", fontSize: "0.95rem" }}>
                The average match probability for white patients is <strong>79%</strong>. For {selected} patients it is <strong>{data.probability}%</strong>. Every donor from your background directly closes this gap.
              </p>
            </div>

            {/* CTA */}
            <div style={{ marginTop: "2rem", background: "linear-gradient(135deg, #0f4c75, #0d9488)", borderRadius: "20px", padding: "2.5rem", textAlign: "center", color: "white" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.75rem" }}>Ready to be someone's match?</h2>
              <p style={{ opacity: 0.85, marginBottom: "1.5rem", lineHeight: "1.6" }}>Joining the registry takes 10 minutes and a cheek swab.</p>
              <button
                onClick={() => window.open("https://bethematch.org/support-the-mission/donate-blood-stem-cells/join-the-marrow-registry/", "_blank")}
                style={{ background: "#f4a261", color: "white", border: "none", borderRadius: "99px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer" }}
              >
                Join the registry →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore