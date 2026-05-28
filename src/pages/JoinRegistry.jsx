import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLang } from "../context/LanguageContext"

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const eligibilityKeys = [
  { titleKey: "join.eligible.age",     descKey: "join.eligible.age.desc"     },
  { titleKey: "join.eligible.health",  descKey: "join.eligible.health.desc"  },
  { titleKey: "join.eligible.willing", descKey: "join.eligible.willing.desc" },
]

async function askClaude(question) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question, background: "" }),
  })
  if (!res.ok) throw new Error("API error")
  const data = await res.json()
  return data.reply
}

function JoinRegistry() {
  const { t } = useLang()
  const [question, setQuestion]   = useState("")
  const [answer, setAnswer]       = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const answerRef                 = useRef(null)

  const chipKeys = ["join.ask.chip1", "join.ask.chip2", "join.ask.chip3", "join.ask.chip4"]

  async function handleAsk(q) {
    const text = q ?? question
    if (!text.trim()) return
    setLoading(true)
    setAnswer(null)
    setError(null)
    try {
      const reply = await askClaude(text)
      setAnswer(reply)
      setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleChip(key) {
    const text = t(key)
    setQuestion(text)
    handleAsk(text)
  }

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>

      {/* Hero — dark, left-aligned */}
      <div style={{ background: "#0A0A0A", padding: "5rem 2rem 4.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", borderRadius: "99px", padding: "0.4rem 1.2rem", fontSize: "0.72rem", letterSpacing: "0.15em", marginBottom: "1.75rem", color: "#F0EDE8", fontFamily: "'Proxima Nova', 'Nunito Sans', sans-serif", fontWeight: "700", textTransform: "uppercase" }}>
              {t("join.badge")}
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "900", lineHeight: "1.08", marginBottom: "1rem", fontFamily: "Lora, serif", color: "#F0EDE8", letterSpacing: "-0.01em" }}>
              {t("join.heading")}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(240,237,232,0.65)", lineHeight: "1.8", maxWidth: "500px", marginBottom: "2.5rem" }}>
              {t("join.subtext")}
            </p>
            <motion.a
              href="https://bethematch.org/support-the-cause/donate-bone-marrow/join-the-marrow-registry/before-you-join/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block", background: "#1D9E75", color: "white", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none" }}
            >
              {t("join.cta.btn")}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Eligibility — no icons, teal border top */}
      <div style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "2rem", textAlign: "center", letterSpacing: "-0.01em" }}
          >
            {t("join.eligible.heading")}
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}
          >
            {eligibilityKeys.map(({ titleKey, descKey }) => (
              <motion.div
                key={titleKey}
                variants={staggerItem}
                style={{ background: "#faf7f2", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", gap: "0.6rem", borderTop: "3px solid #1D9E75" }}
              >
                <div style={{ fontWeight: "800", fontSize: "1rem", color: "#1D9E75" }}>{t(titleKey)}</div>
                <div style={{ fontSize: "0.875rem", color: "#666", lineHeight: "1.65" }}>{t(descKey)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Ask Claude */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#faf7f2", padding: "5rem 1.5rem" }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: "900", marginBottom: "0.6rem", letterSpacing: "-0.01em", textAlign: "center" }}>
            {t("join.ask.heading")}
          </h2>
          <p style={{ color: "#777", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.75rem", textAlign: "center", maxWidth: "500px", margin: "0 auto 1.75rem" }}>
            {t("join.ask.subtext")}
          </p>

          {/* Suggestion chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1.5rem" }}>
            {chipKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleChip(key)}
                disabled={loading}
                style={{
                  background: "white",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "99px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  color: "#374151",
                  cursor: loading ? "default" : "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (!loading) { e.target.style.borderColor = "#1D9E75"; e.target.style.color = "#1D9E75" } }}
                onMouseLeave={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.color = "#374151" }}
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-end" }}>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk() } }}
              placeholder={t("join.ask.placeholder")}
              rows={2}
              style={{
                flex: 1,
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                border: "1.5px solid #e5e7eb",
                fontSize: "0.92rem",
                fontFamily: "inherit",
                resize: "none",
                outline: "none",
                background: "white",
                color: "#1a1a2e",
                lineHeight: "1.55",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = "#1D9E75"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAsk()}
              disabled={loading || !question.trim()}
              style={{
                background: loading || !question.trim() ? "#d1d5db" : "#1D9E75",
                color: "white",
                border: "none",
                borderRadius: "14px",
                padding: "0.85rem 1.4rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: loading || !question.trim() ? "default" : "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.15s",
                alignSelf: "stretch",
              }}
            >
              {loading ? t("join.ask.loading") : t("join.ask.btn")}
            </motion.button>
          </div>

          {/* Answer */}
          <AnimatePresence>
            {(answer || error) && (
              <motion.div
                ref={answerRef}
                key="answer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  marginTop: "1.25rem",
                  background: error ? "#fff5f5" : "white",
                  border: `1.5px solid ${error ? "#fca5a5" : "#e5e7eb"}`,
                  borderLeft: `4px solid ${error ? "#ef4444" : "#1D9E75"}`,
                  borderRadius: "14px",
                  padding: "1.25rem 1.4rem",
                  fontSize: "0.92rem",
                  color: error ? "#b91c1c" : "#333",
                  lineHeight: "1.75",
                  whiteSpace: "pre-wrap",
                }}
              >
                {error || answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* What to expect */}
      <div style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "2rem", textAlign: "center", letterSpacing: "-0.01em" }}
          >
            {t("join.expect.heading")}
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: "#f0fdf8", border: "2px solid #1D9E75", borderRadius: "20px", padding: "2rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />
                <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#1D9E75" }}>{t("join.expect.pbsc.title")}</div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: "1.75" }}>{t("join.expect.pbsc.desc")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: "#faf7f2", border: "2px solid #e5e7eb", borderRadius: "20px", padding: "2rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#888", flexShrink: 0 }} />
                <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#555" }}>{t("join.expect.bm.title")}</div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#444", lineHeight: "1.75" }}>{t("join.expect.bm.desc")}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom CTA — dark */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#0A0A0A", padding: "6rem 1.5rem", textAlign: "center", color: "#F0EDE8" }}
      >
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "900", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{t("join.cta.heading")}</h2>
          <p style={{ color: "rgba(240,237,232,0.7)", lineHeight: "1.7", marginBottom: "2rem", fontSize: "1.05rem" }}>{t("join.cta.body")}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="https://bethematch.org/support-the-cause/donate-bone-marrow/join-the-marrow-registry/before-you-join/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ background: "#1D9E75", color: "white", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block" }}
            >
              {t("join.cta.btn")}
            </motion.a>
            <motion.a
              href="https://bethematch.org/support-the-cause/donate-financially/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(255,255,255,0.08)", color: "#F0EDE8", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {t("nav.donate")}
            </motion.a>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default JoinRegistry
