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

function App() {
  const [selected, setSelected] = useState("")

  const data = matchData[selected]

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