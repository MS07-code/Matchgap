import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WorldMap from "../components/WorldMap"
import { useLang } from "../context/LanguageContext"

const matchData = {
  "White / Caucasian":        { probability: 79, patients: 1200 },
  "Hispanic / Latino":        { probability: 46, patients: 3400 },
  "Black / African American": { probability: 29, patients: 5800 },
  "Asian / Pacific Islander": { probability: 47, patients: 2100 },
  "South Asian":              { probability: 48, patients: 1900 },
  "Middle Eastern":           { probability: 43, patients: 890  },
  "Mixed / Multiracial":      { probability: 22, patients: 4200 },
  "Native American":          { probability: 32, patients: 670  },
}

const bgKeyMap = {
  "White / Caucasian":        "community.white",
  "Hispanic / Latino":        "community.hispanic",
  "Black / African American": "community.black",
  "Asian / Pacific Islander": "community.asian",
  "South Asian":              "community.southasian",
  "Middle Eastern":           "community.middleeastern",
  "Mixed / Multiracial":      "community.mixed",
  "Native American":          "community.native",
}

const bigThree = [
  { stat: "79%", labelKey: "home.gap.stat1", color: "#1D9E75" },
  { stat: "29%", labelKey: "home.gap.stat2", color: "#E24B4A" },
  { stat: "22%", labelKey: "home.gap.stat3", color: "#E24B4A" },
]

const communityQuotes = {
  "Black / African American": [
    "22 of 100 find a match today. Your registration changes that number.",
    "Someone who looks like you is searching right now. You could be their answer.",
    "The registry needs you specifically. Your DNA exists nowhere else.",
    "Every Black donor who joins rewrites the odds for the next patient.",
  ],
  "Hispanic / Latino": [
    "Your heritage is rare in the registry. That makes you more valuable, not less.",
    "48% today. Every new donor pushes that number higher.",
    "Someone with your background is waiting. You might already be their match.",
    "Joining takes 10 minutes. The impact lasts a lifetime.",
  ],
  "Asian / Pacific Islander": [
    "Your genetic background is underrepresented. Your registration fills a real gap.",
    "47% today. You have the power to move that needle.",
    "The match someone needs might only exist in your DNA.",
    "One swab. One kit. One life potentially saved.",
  ],
  "South Asian": [
    "South Asian donors are critically needed. You could be the one someone has been waiting for.",
    "50% today — but that number can grow. It starts with you.",
    "Your DNA is unique to your heritage. No one else can fill your spot.",
    "The registry grows stronger every time someone like you joins.",
  ],
  "Middle Eastern": [
    "Middle Eastern donors are rare in the registry. Your background makes you irreplaceable.",
    "45% today. Your registration is direct action.",
    "Someone is searching for a donor with your exact markers right now.",
    "You don't have to wait to make a difference. You can start today.",
  ],
  "Mixed / Multiracial": [
    "Multiracial patients have the hardest time finding a match. You understand that gap firsthand.",
    "22% today. Multiracial donors are among the most needed in the entire registry.",
    "Your unique combination of backgrounds could save someone no one else can.",
    "The registry was never built with you in mind. Help us change that.",
  ],
  "Native American": [
    "Native American donors are among the rarest in the registry. Your registration matters enormously.",
    "30% today. Every donor from your community is a lifeline.",
    "Your heritage carries DNA markers found nowhere else. That's exactly what some patients need.",
    "Joining the registry is one of the most powerful things you can do for your community.",
  ],
  "White / Caucasian": [
    "The registry has more white donors — but patients of all backgrounds still need you.",
    "You might be the match for someone whose community has no one else.",
    "Donors get matched across all backgrounds. Your registration still saves lives.",
    "79% today — because people like you showed up. Help others get there too.",
  ],
  "": [
    "Your DNA is unlike anyone else's. Someone out there needs exactly that.",
    "The match someone is waiting for might already be inside you.",
    "10 minutes to register. A lifetime of impact.",
    "Every background matters. Every registration counts.",
  ],
}

// Rotating quote — fades out → next quote → fades in, every 4.8s
function RotatingQuote({ quotes, resetKey }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setIdx(0)
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % quotes.length)
    }, 4800)
    return () => clearInterval(timer)
  }, [resetKey, quotes.length])

  return (
    <div style={{ minHeight: "3.5rem" }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${resetKey}-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            fontSize: "1.125rem",
            fontFamily: "Lora, serif",
            color: "#1a1a2e",
            lineHeight: "1.75",
            maxWidth: "560px",
            margin: 0,
          }}
        >
          {quotes[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function dotColor(probability) {
  if (probability >= 70) return "#1D9E75"
  if (probability >= 45) return "#EF9F27"
  return "#E24B4A"
}

// 100 circles in a 10×10 grid. filled = match found.
function DotGrid({ probability, color, label, animKey }) {
  const filled = Math.round(probability)
  return (
    <div>
      <p style={{ fontSize: "0.82rem", fontWeight: "700", color: "#555", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Proxima Nova','Nunito Sans',sans-serif" }}>
        {label}
      </p>
      <motion.div
        key={animKey}
        style={{ display: "flex", flexWrap: "wrap", gap: "5px", width: "calc(10 * 14px + 9 * 5px)" }}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.008 } } }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { scale: 0.3, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
            }}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: i < filled ? color : "transparent",
              border: `2px solid ${i < filled ? color : "#d1d5db"}`,
              flexShrink: 0,
            }}
          />
        ))}
      </motion.div>
      <p style={{ fontSize: "1.4rem", fontWeight: "900", color, marginTop: "0.75rem", fontFamily: "Lora, serif" }}>
        {filled} of 100
      </p>
    </div>
  )
}

function Explore() {
  const { t } = useLang()
  const [selected, setSelected] = useState("")
  const data = matchData[selected]

  const communityColor = data ? dotColor(data.probability) : "#E24B4A"

  // Default minority panel: Black patients (29%) until user picks
  const minorityProb   = data ? data.probability : 29
  const minorityColor  = data ? communityColor : "#E24B4A"
  const minorityLabel  = data
    ? t("explore.dots.community", { community: t(bgKeyMap[selected]), count: Math.round(data.probability) })
    : t("explore.dots.community", { community: t("community.black"), count: 29 })
  const minorityKey    = selected || "black-default"

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>

      {/* Dark header */}
      <div style={{ background: "#0A0A0A", padding: "5rem 2rem 4.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "900", lineHeight: "1.08", marginBottom: "1rem", fontFamily: "Lora, serif", color: "#F0EDE8", letterSpacing: "-0.01em" }}
          >
            {t("explore.heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ color: "rgba(240,237,232,0.65)", fontSize: "1.1rem", maxWidth: "480px", lineHeight: "1.8" }}
          >
            {t("explore.subtext")}
          </motion.p>
        </div>
      </div>

      {/* ── Big 3 numbers ── */}
      <div style={{ background: "white", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", textAlign: "center" }}>
            {bigThree.map(({ stat, labelKey, color }) => (
              <div key={stat}>
                <div style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: "900", color, fontFamily: "Lora, serif", lineHeight: 1 }}>{stat}</div>
                <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.6rem", lineHeight: "1.4", maxWidth: "150px", margin: "0.6rem auto 0" }}>{t(labelKey)}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "0.88rem", color: "#999", marginTop: "2rem", fontStyle: "italic" }}>
            {t("home.gap.gutpunch")}
          </p>
        </div>
      </div>

      {/* ── Community selector + big number reveal + rotating quotes ── */}
      <div style={{ background: "#faf7f2", padding: "0 1.5rem 5rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "2.5rem", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "900", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
              {t("explore.community.heading")}
            </h2>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.25rem" }}>{t("explore.select.label")}</p>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              style={{ width: "100%", padding: "0.85rem 1rem", fontSize: "1rem", borderRadius: "12px", border: "2px solid #e9e9e9", background: "#faf7f2", cursor: "pointer", outline: "none" }}
            >
              <option value="">{t("explore.select.placeholder")}</option>
              {Object.keys(matchData).map((key) => (
                <option key={key} value={key}>{t(bgKeyMap[key])}</option>
              ))}
            </select>

            {/* Big % number — only when community is selected */}
            <AnimatePresence mode="wait">
              {data && (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #f3f4f6" }}
                >
                  <div style={{ fontSize: "clamp(4rem, 12vw, 6.5rem)", fontWeight: "900", color: communityColor, fontFamily: "Lora, serif", lineHeight: 1 }}>
                    {data.probability}%
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rotating quotes — always visible */}
            <div style={{ marginTop: data ? "1.5rem" : "2rem" }}>
              <RotatingQuote
                quotes={communityQuotes[selected] || communityQuotes[""]}
                resetKey={selected}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── People dots visualization ── */}
      <div style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "900", marginBottom: "0.5rem", textAlign: "center", letterSpacing: "-0.01em" }}>
            Out of 100 patients searching for a match…
          </h2>
          <p style={{ textAlign: "center", color: "#888", fontSize: "0.9rem", marginBottom: "3.5rem" }}>
            Each circle is one patient. Filled = match found.
          </p>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
            <DotGrid
              probability={79}
              color="#1D9E75"
              label={t("explore.dots.white")}
              animKey="white"
            />
            <DotGrid
              probability={minorityProb}
              color={minorityColor}
              label={minorityLabel}
              animKey={minorityKey}
            />
          </div>
        </div>
      </div>

      {/* ── CTA (shown only when community selected) ── */}
      {data && (
        <div style={{ background: "#faf7f2", padding: "0 1.5rem 5rem" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div style={{ background: "#0A0A0A", borderRadius: "20px", padding: "2.5rem", textAlign: "center", color: "#F0EDE8" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: "900", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{t("explore.cta.heading")}</h2>
              <p style={{ color: "rgba(240,237,232,0.7)", marginBottom: "1.5rem", lineHeight: "1.6" }}>{t("explore.cta.body")}</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => window.open("https://bethematch.org/support-the-cause/donate-bone-marrow/join-the-marrow-registry/before-you-join/", "_blank")}
                  style={{ background: "#1D9E75", color: "white", border: "none", borderRadius: "99px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer" }}
                >
                  {t("explore.cta.btn1")}
                </button>
                <button
                  onClick={() => window.open("https://bethematch.org/support-the-cause/donate-financially/", "_blank")}
                  style={{ background: "rgba(255,255,255,0.08)", color: "#F0EDE8", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "99px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer" }}
                >
                  {t("explore.cta.btn2")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── World map ── */}
      <WorldMap />

    </div>
  )
}

export default Explore
