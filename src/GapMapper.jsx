import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts"

const gapData = [
  { group: "White", registry: 79, need: 21 },
  { group: "Hispanic", registry: 46, need: 54 },
  { group: "Asian", registry: 47, need: 53 },
  { group: "South Asian", registry: 48, need: 52 },
  { group: "Middle Eastern", registry: 43, need: 57 },
  { group: "Black", registry: 29, need: 71 },
  { group: "Multiracial", registry: 22, need: 78 },
  { group: "Native American", registry: 32, need: 68 },
]

const stateData = [
  { state: "California", unmatched: 12400, topGroup: "Hispanic / Latino" },
  { state: "Texas", unmatched: 10200, topGroup: "Black / African American" },
  { state: "New York", unmatched: 8900, topGroup: "Mixed / Multiracial" },
  { state: "Florida", unmatched: 7600, topGroup: "Hispanic / Latino" },
  { state: "Georgia", unmatched: 5400, topGroup: "Black / African American" },
  { state: "Illinois", unmatched: 4800, topGroup: "Black / African American" },
  { state: "New Jersey", unmatched: 4200, topGroup: "South Asian" },
  { state: "Washington", unmatched: 3900, topGroup: "Asian / Pacific Islander" },
  { state: "Michigan", unmatched: 3600, topGroup: "Middle Eastern" },
  { state: "Arizona", unmatched: 3100, topGroup: "Native American" },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "8px", padding: "0.75rem", fontSize: "0.9rem" }}>
        <p style={{ margin: "0 0 0.25rem", fontWeight: "600" }}>{label}</p>
        <p style={{ margin: 0, color: "#27ae60" }}>Match probability: {payload[0]?.value}%</p>
        <p style={{ margin: 0, color: "#c0392b" }}>Gap: {payload[1]?.value}%</p>
      </div>
    )
  }
  return null
}

function GapMapper() {
  return (
    <div style={{ marginTop: "3rem", borderTop: "1px solid #eee", paddingTop: "2rem" }}>
      <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>The donor gap by community</h2>
      <p style={{ color: "#666", marginBottom: "2rem", fontSize: "0.95rem" }}>
        Match probability vs. the gap that still needs to be filled. Every new donor from an underrepresented community directly moves these numbers.
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={gapData} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={12} />
          <YAxis type="category" dataKey="group" width={100} fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="registry" name="Match probability" stackId="a" fill="#27ae60" radius={[0, 0, 0, 0]} />
          <Bar dataKey="need" name="Gap remaining" stackId="a" fill="#e74c3c" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", marginTop: "2.5rem" }}>States with the most unmatched patients</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        Where the need is most urgent right now, and which community is most underrepresented in each state.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {stateData.map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1rem", background: "#f9f9f9", borderRadius: "10px" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#2c3e50", minWidth: "24px" }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600" }}>{row.state}</div>
              <div style={{ fontSize: "0.85rem", color: "#888" }}>Most needed: {row.topGroup}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700", color: "#c0392b" }}>{row.unmatched.toLocaleString()}</div>
              <div style={{ fontSize: "0.8rem", color: "#888" }}>unmatched patients</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GapMapper
