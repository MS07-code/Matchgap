import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { motion } from "framer-motion"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useLang } from "./context/LanguageContext"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const gapData = [
  { id: "white",       groupKey: "group.white",        registry: 79, need: 21 },
  { id: "hispanic",    groupKey: "group.hispanic",      registry: 46, need: 54 },
  { id: "asian",       groupKey: "group.asian",         registry: 47, need: 53 },
  { id: "southasian",  groupKey: "group.southasian",    registry: 48, need: 52 },
  { id: "middle",      groupKey: "group.middleeastern", registry: 43, need: 57 },
  { id: "black",       groupKey: "group.black",         registry: 29, need: 71 },
  { id: "multiracial", groupKey: "group.multiracial",   registry: 22, need: 78 },
  { id: "native",      groupKey: "group.native",        registry: 32, need: 68 },
]

// Maps stateData topGroup strings → translation keys
const topGroupKeyMap = {
  "Hispanic / Latino":        "community.hispanic",
  "Black / African American": "community.black",
  "Native American":          "community.native",
  "Asian / Pacific Islander": "community.asian",
  "Middle Eastern":           "community.middleeastern",
  "South Asian":              "community.southasian",
  "Mixed / Multiracial":      "community.mixed",
}

const stateData = {
  "Alabama":              { unmatched: 2100,  topGroup: "Black / African American" },
  "Alaska":               { unmatched: 750,   topGroup: "Native American" },
  "Arizona":              { unmatched: 3100,  topGroup: "Hispanic / Latino" },
  "Arkansas":             { unmatched: 1400,  topGroup: "Black / African American" },
  "California":           { unmatched: 12400, topGroup: "Hispanic / Latino" },
  "Colorado":             { unmatched: 2600,  topGroup: "Hispanic / Latino" },
  "Connecticut":          { unmatched: 2000,  topGroup: "Black / African American" },
  "Delaware":             { unmatched: 750,   topGroup: "Black / African American" },
  "Florida":              { unmatched: 7600,  topGroup: "Hispanic / Latino" },
  "Georgia":              { unmatched: 5400,  topGroup: "Black / African American" },
  "Hawaii":               { unmatched: 2200,  topGroup: "Asian / Pacific Islander" },
  "Idaho":                { unmatched: 550,   topGroup: "Hispanic / Latino" },
  "Illinois":             { unmatched: 4800,  topGroup: "Black / African American" },
  "Indiana":              { unmatched: 1900,  topGroup: "Black / African American" },
  "Iowa":                 { unmatched: 650,   topGroup: "Black / African American" },
  "Kansas":               { unmatched: 1100,  topGroup: "Hispanic / Latino" },
  "Kentucky":             { unmatched: 1300,  topGroup: "Black / African American" },
  "Louisiana":            { unmatched: 2900,  topGroup: "Black / African American" },
  "Maine":                { unmatched: 280,   topGroup: "Mixed / Multiracial" },
  "Maryland":             { unmatched: 3200,  topGroup: "Black / African American" },
  "Massachusetts":        { unmatched: 2800,  topGroup: "Mixed / Multiracial" },
  "Michigan":             { unmatched: 3600,  topGroup: "Middle Eastern" },
  "Minnesota":            { unmatched: 1900,  topGroup: "Black / African American" },
  "Mississippi":          { unmatched: 2100,  topGroup: "Black / African American" },
  "Missouri":             { unmatched: 2100,  topGroup: "Black / African American" },
  "Montana":              { unmatched: 480,   topGroup: "Native American" },
  "Nebraska":             { unmatched: 800,   topGroup: "Hispanic / Latino" },
  "Nevada":               { unmatched: 2300,  topGroup: "Hispanic / Latino" },
  "New Hampshire":        { unmatched: 300,   topGroup: "Mixed / Multiracial" },
  "New Jersey":           { unmatched: 4200,  topGroup: "South Asian" },
  "New Mexico":           { unmatched: 1700,  topGroup: "Hispanic / Latino" },
  "New York":             { unmatched: 8900,  topGroup: "Mixed / Multiracial" },
  "North Carolina":       { unmatched: 3700,  topGroup: "Black / African American" },
  "North Dakota":         { unmatched: 380,   topGroup: "Native American" },
  "Ohio":                 { unmatched: 3100,  topGroup: "Black / African American" },
  "Oklahoma":             { unmatched: 1500,  topGroup: "Native American" },
  "Oregon":               { unmatched: 1800,  topGroup: "Hispanic / Latino" },
  "Pennsylvania":         { unmatched: 3400,  topGroup: "Black / African American" },
  "Rhode Island":         { unmatched: 520,   topGroup: "Hispanic / Latino" },
  "South Carolina":       { unmatched: 2100,  topGroup: "Black / African American" },
  "South Dakota":         { unmatched: 480,   topGroup: "Native American" },
  "Tennessee":            { unmatched: 2300,  topGroup: "Black / African American" },
  "Texas":                { unmatched: 10200, topGroup: "Black / African American" },
  "Utah":                 { unmatched: 850,   topGroup: "Hispanic / Latino" },
  "Vermont":              { unmatched: 230,   topGroup: "Mixed / Multiracial" },
  "Virginia":             { unmatched: 3200,  topGroup: "Black / African American" },
  "Washington":           { unmatched: 3900,  topGroup: "Asian / Pacific Islander" },
  "West Virginia":        { unmatched: 380,   topGroup: "Mixed / Multiracial" },
  "Wisconsin":            { unmatched: 1700,  topGroup: "Black / African American" },
  "Wyoming":              { unmatched: 280,   topGroup: "Native American" },
  "District of Columbia": { unmatched: 1100,  topGroup: "Black / African American" },
}

const groupColors = {
  "Hispanic / Latino":        "#f4a261",
  "Black / African American": "#e63946",
  "Mixed / Multiracial":      "#9b5de5",
  "South Asian":              "#0f4c75",
  "Asian / Pacific Islander": "#2a9d8f",
  "Middle Eastern":           "#457b9d",
  "Native American":          "#e76f51",
}

function getFillColor(stateName) {
  const d = stateData[stateName]
  if (!d) return "#d1d5db"
  const tVal = Math.sqrt(Math.min(Math.max((d.unmatched - 200) / (12400 - 200), 0), 1))
  const stops = [
    [254, 226, 226],
    [252, 165, 165],
    [248, 113, 113],
    [239, 68,  68 ],
    [220, 38,  38 ],
    [185, 28,  28 ],
    [127, 29,  29 ],
  ]
  const idx = tVal * (stops.length - 1)
  const i = Math.min(Math.floor(idx), stops.length - 2)
  const frac = idx - i
  const [r1, g1, b1] = stops[i]
  const [r2, g2, b2] = stops[i + 1]
  return `rgb(${Math.round(r1 + (r2 - r1) * frac)},${Math.round(g1 + (g2 - g1) * frac)},${Math.round(b1 + (b2 - b1) * frac)})`
}

function ChartTooltip({ active, payload, label }) {
  const { t } = useLang()
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "8px", padding: "0.75rem", fontSize: "0.9rem" }}>
        <p style={{ margin: "0 0 0.25rem", fontWeight: "600" }}>{label}</p>
        <p style={{ margin: 0, color: "#27ae60" }}>{t("gap.chart.match")}: {payload[0]?.value}%</p>
        <p style={{ margin: 0, color: "#c0392b" }}>{t("gap.chart.gap")}: {payload[1]?.value}%</p>
      </div>
    )
  }
  return null
}

function GapMapper() {
  const [tooltip, setTooltip] = useState(null)
  const { t } = useLang()

  const translatedGapData = gapData.map(d => ({ ...d, group: t(d.groupKey) }))

  return (
    <div style={{ paddingTop: "1rem" }}>

      {/* US Map — first */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{t("gap.map.heading")}</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {t("gap.map.subtext")}
        </p>

        <div style={{ position: "relative", background: "#f8fafc", borderRadius: "16px", overflow: "hidden" }}>
          <ComposableMap projection="geoAlbersUsa" style={{ width: "100%", height: "auto" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.name
                  const d = stateData[name]
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFillColor(name)}
                      stroke="white"
                      strokeWidth={0.8}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", opacity: 0.8, cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(evt) => {
                        if (d) setTooltip({ name, ...d, x: evt.clientX, y: evt.clientY })
                      }}
                      onMouseMove={(evt) => {
                        if (d) setTooltip(prev => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : prev)
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Floating tooltip */}
        {tooltip && (
          <div style={{
            position: "fixed",
            left: tooltip.x + 14,
            top: tooltip.y - 10,
            background: "white",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            zIndex: 999,
            minWidth: "190px",
          }}>
            <div style={{ fontWeight: "700", marginBottom: "0.25rem", fontSize: "0.95rem" }}>{tooltip.name}</div>
            <div style={{ fontSize: "0.9rem", color: "#dc2626", fontWeight: "600" }}>
              {tooltip.unmatched.toLocaleString()} {t("gap.tooltip.unmatched")}
            </div>
            <div style={{ fontSize: "0.82rem", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: groupColors[tooltip.topGroup], display: "inline-block", flexShrink: 0 }} />
              <span style={{ color: "#555" }}>{t("gap.tooltip.needed")} <strong>{t(topGroupKeyMap[tooltip.topGroup] || tooltip.topGroup)}</strong></span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "1.5rem", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "#666", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("gap.legend.patients")}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <span style={{ fontSize: "0.75rem", color: "#888", marginRight: "4px" }}>{t("gap.legend.fewer")}</span>
              {[0, 0.15, 0.3, 0.5, 0.65, 0.8, 1].map((v) => {
                const stops = [[254,226,226],[252,165,165],[248,113,113],[239,68,68],[220,38,38],[185,28,28],[127,29,29]]
                const idx = v * (stops.length - 1)
                const i = Math.min(Math.floor(idx), stops.length - 2)
                const frac = idx - i
                const [r1,g1,b1] = stops[i], [r2,g2,b2] = stops[i+1]
                const color = `rgb(${Math.round(r1+(r2-r1)*frac)},${Math.round(g1+(g2-g1)*frac)},${Math.round(b1+(b2-b1)*frac)})`
                return <div key={v} style={{ width: 28, height: 16, background: color, borderRadius: 3 }} />
              })}
              <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "4px" }}>{t("gap.legend.more")}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "#666", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("gap.legend.group")}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1rem" }}>
              {Object.entries(groupColors).map(([group, color]) => (
                <div key={group} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "#444" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  {t(topGroupKeyMap[group] || group)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bar chart — secondary reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid #eee" }}
      >
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#888", marginBottom: "0.4rem", letterSpacing: "0.02em" }}>{t("gap.bar.heading")}</h3>
        <p style={{ color: "#aaa", marginBottom: "1.75rem", fontSize: "0.88rem" }}>
          {t("gap.bar.subtext")}
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={translatedGapData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={11} />
            <YAxis type="category" dataKey="group" width={130} fontSize={11} />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Bar dataKey="registry" name={t("gap.chart.match")} stackId="a" fill="#1D9E75" />
            <Bar dataKey="need" name={t("gap.chart.gap")} stackId="a" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}

export default GapMapper
