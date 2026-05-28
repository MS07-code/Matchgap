import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useLang } from "../context/LanguageContext"

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const diseasePillKeys = [
  "disease.leukemia.name",
  "disease.sickle.name",
  "disease.lymphoma.name",
  "disease.aplastic.name",
]

const bigThree = [
  { stat: "79%", labelKey: "home.gap.stat1", color: "#1D9E75" },
  { stat: "29%", labelKey: "home.gap.stat2", color: "#E24B4A" },
  { stat: "22%", labelKey: "home.gap.stat3", color: "#E24B4A" },
]

function Home() {
  const { t } = useLang()

  return (
    <div>
      {/* Hero — dark, photo at 40%, left-aligned */}
      <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", padding: "8rem 2rem 5rem max(2rem, calc((100vw - 1100px) / 2))", position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&q=80"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
        />
        <motion.div
          style={{ maxWidth: "760px", position: "relative", zIndex: 1 }}
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div
            variants={staggerItem}
            style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", borderRadius: "99px", padding: "0.4rem 1.2rem", fontSize: "0.72rem", letterSpacing: "0.15em", marginBottom: "2rem", color: "#F0EDE8", fontFamily: "'Proxima Nova', 'Nunito Sans', sans-serif", fontWeight: "700", textTransform: "uppercase" }}
          >
            {t("home.badge")}
          </motion.div>
          <motion.h1
            variants={staggerItem}
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: "900", lineHeight: "1.05", marginBottom: "1.75rem", fontFamily: "Lora, serif", color: "#F0EDE8", letterSpacing: "-0.01em" }}
          >
            {t("home.heading")}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            style={{ fontSize: "1.15rem", color: "rgba(240,237,232,0.72)", lineHeight: "1.85", marginBottom: "2.5rem", maxWidth: "500px" }}
          >
            {t("home.subtext")}
          </motion.p>
          <motion.div variants={staggerItem} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/explore" style={{ background: "#1D9E75", color: "white", padding: "1rem 2rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
                {t("home.cta.impact")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/stories" style={{ background: "rgba(255,255,255,0.1)", color: "#F0EDE8", padding: "1rem 2rem", borderRadius: "99px", fontWeight: "600", fontSize: "1rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.22)" }}>
                {t("home.cta.stories")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="https://bethematch.org/support-the-cause/donate-financially/" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.06)", color: "#F0EDE8", padding: "1rem 2rem", borderRadius: "99px", fontWeight: "600", fontSize: "1rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.14)" }}>
                {t("home.cta.donate")}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* What is bone marrow donation */}
      <div style={{ background: "white", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "1.15rem", color: "#444", lineHeight: "1.9", marginBottom: "2rem" }}
          >
            {t("home.what.body")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "1.5rem" }}
          >
            {diseasePillKeys.map((key) => (
              <span key={key} style={{ background: "#faf7f2", border: "1px solid #e5e7eb", borderRadius: "99px", padding: "0.45rem 1.1rem", fontSize: "0.9rem", fontWeight: "600", color: "#374151" }}>
                {t(key)}
              </span>
            ))}
            <Link to="/about" style={{ background: "#f0fdf8", border: "1px solid #1D9E75", borderRadius: "99px", padding: "0.45rem 1.1rem", fontSize: "0.9rem", fontWeight: "600", color: "#1D9E75", textDecoration: "none" }}>
              {t("home.what.more")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* The gap in numbers — 3 big numbers, no cards */}
      <div style={{ background: "#faf7f2", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "3rem", textAlign: "center", letterSpacing: "-0.01em" }}
          >
            {t("home.gap.heading")}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", textAlign: "center" }}
          >
            {bigThree.map(({ stat, labelKey, color }) => (
              <motion.div
                key={stat}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <div style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", fontWeight: "900", color, fontFamily: "Lora, serif", lineHeight: 1 }}>{stat}</div>
                <div style={{ fontSize: "0.88rem", color: "#666", marginTop: "0.75rem", lineHeight: "1.4", maxWidth: "160px", margin: "0.75rem auto 0" }}>{t(labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", marginTop: "3rem" }}
          >
            <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "0.85rem", fontStyle: "italic" }}>
              {t("home.gap.gutpunch")}
            </p>
            <Link to="/explore" style={{ color: "#1D9E75", fontWeight: "700", textDecoration: "none", fontSize: "0.95rem" }}>
              {t("home.gap.link")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA — dark */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "#0A0A0A", padding: "6rem 1.5rem", textAlign: "center", color: "#F0EDE8" }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
            {t("home.bottom.heading")}
          </h2>
          <p style={{ color: "rgba(240,237,232,0.7)", lineHeight: "1.75", marginBottom: "2.5rem", fontSize: "1.05rem" }}>
            {t("home.bottom.body")}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/explore" style={{ background: "#1D9E75", color: "white", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
                {t("home.bottom.btn1")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a href="https://bethematch.org/support-the-cause/donate-financially/" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.08)", color: "#F0EDE8", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }}>
                {t("home.bottom.btn2")}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div style={{ textAlign: "center", padding: "2rem", color: "#aaa", fontSize: "0.85rem", borderTop: "1px solid #eee", background: "white" }}>
        {t("home.footer")}
      </div>
    </div>
  )
}

export default Home
