import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useLang } from "../context/LanguageContext"

const DISEASE_GROUPS = [
  {
    id: "blood-cancers",
    label: "Blood Cancers",
    communityTag: "Affects all communities",
    communityIcon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "#0F6E56", fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Blood cancers",
    body: "The most common reason patients need a bone marrow transplant. Leukemia, lymphoma, and MDS account for the majority of transplant procedures each year. A match from the same ethnic background can be the difference between life and death — but the registry isn't diverse enough to reflect every patient who needs it.",
    stats: [
      { num: "60%",  label: "of minority patients never find a matched donor" },
      { num: "18K+", label: "transplants performed annually in the U.S." },
    ],
    pills: ["Leukemia", "Lymphoma", "Multiple Myeloma", "MDS", "Hodgkin's Disease"],
    quote: "My doctor told me I needed a transplant. Finding a Black donor felt impossible — until someone registered because of a campaign like this.",
    byline: "Marcus, 34 — AML Survivor",
    ctaText: "Join the registry",
  },
  {
    id: "sickle-cell",
    label: "Sickle Cell & Anemia",
    communityTag: "Disproportionate impact on Black Americans",
    communityIcon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "#0F6E56", fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
    title: "Sickle cell & aplastic anemia",
    body: "Sickle cell disease affects 1 in 365 Black Americans and is one of the most common genetic blood disorders in the world. A bone marrow transplant is the only known cure — but it requires a closely matched donor. Without greater diversity in donor registries, most patients have no viable path to treatment.",
    stats: [
      { num: "1 in 365",   label: "Black Americans born with sickle cell disease" },
      { num: "only cure",  label: "transplant is the sole curative option" },
    ],
    pills: ["Sickle Cell Disease", "Aplastic Anemia", "Diamond-Blackfan Anemia"],
    quote: "I was told the odds of finding a match were low. I needed someone who looked like me. Someone who showed up.",
    byline: "Deja, 28 — Sickle Cell Patient",
    ctaText: "Become a match",
  },
  {
    id: "thalassemia",
    label: "Thalassemia",
    communityTag: "Disproportionate impact on South Asian & Mediterranean communities",
    communityIcon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "#0F6E56", fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
    title: "Thalassemia",
    body: "Thalassemia is a hereditary blood disorder that affects hemoglobin production. It is far more common in people of South Asian, Middle Eastern, Mediterranean, and Southeast Asian descent. A bone marrow transplant offers the only true cure — but a compatible match depends heavily on shared ancestry, making ethnic diversity in the registry essential.",
    stats: [
      { num: "100M+", label: "carriers worldwide" },
      { num: "<30%",  label: "of South Asian patients find a matched unrelated donor" },
    ],
    pills: ["Thalassemia Major", "Thalassemia Intermedia", "Hemoglobin E Disease"],
    quote: "My family searched for two years. My donor was someone who registered because they understood why representation in the registry matters.",
    byline: "Arjun, 19 — Thalassemia Major",
    ctaText: "Register today",
  },
  {
    id: "immune-disorders",
    label: "Immune Disorders",
    communityTag: "Rare but devastating",
    communityIcon: (
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "#0F6E56", fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Immune system disorders",
    body: "Severe immune deficiencies leave the body unable to defend itself against infection. In many cases, a bone marrow transplant is the only path to a functioning immune system — and a normal life. These conditions are often diagnosed in children, making a timely, matched donor even more critical.",
    stats: [
      { num: "1 in 50K", label: "children born with severe immune deficiency" },
      { num: "80%+",     label: "survival rate when treated before 3 months old" },
    ],
    pills: ["SCID", "Wiskott-Aldrich Syndrome", "Chronic Granulomatous Disease", "Immune Deficiency"],
    quote: "Our son's immune system was nonexistent. His cure came from a stranger who took 20 minutes out of their life to swab their cheek.",
    byline: "Maria & James, parents of Elijah, 4",
    ctaText: "It starts with a swab",
  },
]

const COUNTERS = [
  { num: "70+", desc: "blood diseases treatable by transplant" },
  { num: "60%", desc: "of minority patients never find a match" },
  { num: "18K", desc: "transplants performed in the U.S. each year" },
  { num: "1",   desc: "cheek swab is all it takes to join the registry" },
]

function DiseasesSection() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ background: "#faf7f2", padding: "100px 40px 120px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Eyebrow */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1D9E75", marginBottom: "20px" }}>
          <span style={{ display: "block", width: "24px", height: "1.5px", background: "#1D9E75", flexShrink: 0 }} />
          Why it matters
        </div>

        {/* Heading */}
        <h2 style={{ fontFamily: "Lora, serif", fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.1, color: "#0a2540", maxWidth: "640px", marginBottom: "18px", fontWeight: 700 }}>
          Over 70 diseases.<br /><em style={{ fontStyle: "italic", color: "#1D9E75" }}>One cure.</em> Not enough donors.
        </h2>

        {/* Subtext */}
        <p style={{ fontSize: "17px", fontWeight: 300, color: "#3d5450", maxWidth: "520px", lineHeight: 1.7, marginBottom: "72px", fontFamily: "'Nunito Sans', sans-serif" }}>
          Bone marrow and stem cell transplants can cure blood diseases that affect hundreds of thousands of people — but only if a matching donor exists. And right now, the registry doesn't reflect us.
        </p>

        {/* Journey layout */}
        <div className="diseases-journey">

          {/* Spine nav */}
          <nav className="diseases-spine" aria-label="Disease groups">
            <div className="diseases-spine-line" style={{ position: "absolute", left: "50%", top: "32px", bottom: "32px", width: "1px", background: "linear-gradient(to bottom, #1D9E75, #E1F5EE)", transform: "translateX(-50%)" }} aria-hidden="true" />
            <div className="diseases-spine-nodes">
              {DISEASE_GROUPS.map((group, i) => (
                <button
                  key={group.id}
                  className="diseases-spine-node"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  style={{ all: "unset", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", opacity: active !== i ? 0.35 : 1, transition: "opacity 0.2s" }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${active === i ? "#1D9E75" : "rgba(29,158,117,0.18)"}`, background: active === i ? "#E1F5EE" : "#fff", transition: "border-color 0.25s, background 0.25s", zIndex: 1 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: active === i ? "#1D9E75" : "#9FE1CB", transform: active === i ? "scale(1.2)" : "scale(1)", transition: "background 0.25s, transform 0.25s" }} />
                  </div>
                  <span className="diseases-spine-label" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: active === i ? "#0F6E56" : "#7a9990", textAlign: "center", marginTop: "8px", lineHeight: 1.3, transition: "color 0.25s", fontFamily: "'Nunito Sans', sans-serif" }}>
                    {group.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Panels */}
          <div style={{ position: "relative" }}>
            <AnimatePresence mode="wait">
              {DISEASE_GROUPS.map((group, i) => i === active && (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Community tag */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0F6E56", background: "#E1F5EE", borderRadius: "40px", padding: "5px 14px", marginBottom: "22px", fontFamily: "'Nunito Sans', sans-serif" }}>
                    {group.communityIcon}
                    {group.communityTag}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: "Lora, serif", fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15, color: "#0a2540", marginBottom: "14px", fontWeight: 700 }}>
                    {group.title}
                  </h3>

                  {/* Body */}
                  <p style={{ fontSize: "16px", fontWeight: 300, color: "#3d5450", lineHeight: 1.8, maxWidth: "520px", marginBottom: "30px", fontFamily: "'Nunito Sans', sans-serif" }}>
                    {group.body}
                  </p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "36px" }}>
                    {group.stats.map((stat, j) => (
                      <div key={j} style={{ background: "#f4f8f6", border: "0.5px solid rgba(29,158,117,0.18)", borderRadius: "14px", padding: "18px 22px", minWidth: "140px" }}>
                        <div style={{ fontFamily: "Lora, serif", fontSize: "34px", color: "#1D9E75", lineHeight: 1, marginBottom: "5px" }}>{stat.num}</div>
                        <div style={{ fontSize: "12px", fontWeight: 500, color: "#7a9990", lineHeight: 1.4, maxWidth: "130px", fontFamily: "'Nunito Sans', sans-serif" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pills */}
                  <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a9990", marginBottom: "12px", fontFamily: "'Nunito Sans', sans-serif" }}>
                    Diseases in this group
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
                    {group.pills.map(pill => (
                      <span key={pill} style={{ fontSize: "13px", fontWeight: 500, padding: "7px 16px", borderRadius: "40px", border: "1px solid #9FE1CB", color: "#04342C", background: "#fff", fontFamily: "'Nunito Sans', sans-serif" }}>
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Story card */}
                  <div style={{ borderLeft: "3px solid #1D9E75", background: "#E1F5EE", borderRadius: "0 14px 14px 0", padding: "20px 24px", maxWidth: "480px" }}>
                    <p style={{ fontFamily: "Lora, serif", fontSize: "18px", fontStyle: "italic", color: "#04342C", lineHeight: 1.5, marginBottom: "12px" }}>
                      "{group.quote}"
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#0F6E56", fontFamily: "'Nunito Sans', sans-serif" }}>
                      {group.byline}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/join"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "32px", fontSize: "14px", fontWeight: 600, color: "#1D9E75", textDecoration: "none", borderBottom: "1.5px solid #9FE1CB", paddingBottom: "2px", fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    {group.ctaText}
                    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: "currentColor", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Counter bar */}
        <div style={{ marginTop: "80px", borderTop: "1px solid rgba(29,158,117,0.18)", paddingTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "32px" }}>
          {COUNTERS.map(item => (
            <div key={item.num} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Lora, serif", fontSize: "48px", color: "#1D9E75", lineHeight: 1, marginBottom: "8px" }}>{item.num}</div>
              <p style={{ fontSize: "13px", fontWeight: 400, color: "#7a9990", lineHeight: 1.5, maxWidth: "160px", margin: "0 auto", fontFamily: "'Nunito Sans', sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function About() {
  const { t } = useLang()

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#0A0A0A", padding: "5rem 2rem 4.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "900", lineHeight: "1.08", marginBottom: "1rem", fontFamily: "Lora, serif", color: "#F0EDE8", letterSpacing: "-0.01em" }}
          >
            {t("about.heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ color: "rgba(240,237,232,0.65)", fontSize: "1.1rem", maxWidth: "540px", lineHeight: "1.8" }}
          >
            {t("about.subtext")}
          </motion.p>
        </div>
      </div>

      <DiseasesSection />

      {/* CTA */}
      <div style={{ background: "#0A0A0A", padding: "6rem 1.5rem", textAlign: "center", color: "#F0EDE8" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: "900", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{t("about.cta.heading")}</h2>
          <p style={{ color: "rgba(240,237,232,0.7)", lineHeight: "1.7", marginBottom: "2rem" }}>{t("about.cta.body")}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="https://bethematch.org/support-the-cause/donate-bone-marrow/join-the-marrow-registry/before-you-join/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ background: "#1D9E75", color: "white", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block" }}
            >
              {t("about.cta.btn1")}
            </motion.a>
            <motion.a
              href="https://bethematch.org/support-the-cause/donate-financially/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(255,255,255,0.08)", color: "#F0EDE8", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {t("about.cta.btn2")}
            </motion.a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
