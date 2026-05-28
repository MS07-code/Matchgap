import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useLang } from "../context/LanguageContext"

const navKeys = [
  { to: "/",        key: "nav.home" },
  { to: "/about",   key: "nav.about" },
  { to: "/explore", key: "nav.explore" },
  { to: "/stories", key: "nav.stories" },
  { to: "/join",    key: "nav.join" },
]

const NAV_FONT = "'Proxima Nova', 'Nunito Sans', 'Montserrat', sans-serif"

function Navbar() {
  const location = useLocation()
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function onOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* LEFT: logo + desktop nav (or mobile hamburger) */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>

        {/* Mobile-only hamburger */}
        <div ref={menuRef} className="nav-hamburger-wrapper">
          <motion.button
            onClick={() => setMenuOpen(v => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.35rem 0.4rem", display: "flex", flexDirection: "column", gap: "5px", borderRadius: "6px" }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.22 }} style={{ display: "block", width: 22, height: 2, background: "#0A0A0A", borderRadius: 2, transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.18 }} style={{ display: "block", width: 22, height: 2, background: "#0A0A0A", borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.22 }} style={{ display: "block", width: 22, height: 2, background: "#0A0A0A", borderRadius: 2, transformOrigin: "center" }} />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", top: "calc(100% + 0.75rem)", left: 0, background: "white", borderRadius: "16px", boxShadow: "0 16px 56px rgba(0,0,0,0.13)", padding: "1rem", minWidth: "260px", zIndex: 200 }}
              >
                {navKeys.map(({ to, key }, idx) => {
                  const active = location.pathname === to
                  return (
                    <Link
                      key={to}
                      to={to}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.9rem 1.25rem",
                        fontSize: "0.8rem",
                        fontFamily: NAV_FONT,
                        fontWeight: "800",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: active ? "#1D9E75" : "#1a1a2e",
                        background: active ? "#f0fdf8" : "transparent",
                        textDecoration: "none",
                        transition: "background 0.15s, color 0.15s",
                        borderBottom: idx < navKeys.length - 1 ? "1px solid #f3f4f6" : "none",
                        borderBottomLeftRadius: idx < navKeys.length - 1 ? 0 : "10px",
                        borderBottomRightRadius: idx < navKeys.length - 1 ? 0 : "10px",
                        borderTopLeftRadius: idx > 0 ? 0 : "10px",
                        borderTopRightRadius: idx > 0 ? 0 : "10px",
                      }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#1D9E75" } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1a2e" } }}
                    >
                      {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />}
                      {t(key)}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link to="/" style={{ fontFamily: NAV_FONT, fontSize: "1.4rem", fontWeight: "800", color: "#0A0A0A", textDecoration: "none", letterSpacing: "0.18em" }}>
            MatchGap
          </Link>
        </motion.div>

        {/* Desktop-only horizontal nav */}
        <nav className="nav-desktop-links" aria-label="Main navigation">
          {navKeys.map(({ to, key }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                style={{
                  position: "relative",
                  padding: "0.5rem 0.8rem",
                  fontSize: "0.7rem",
                  fontFamily: NAV_FONT,
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? "#1D9E75" : "#555",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#1D9E75" }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#555" }}
              >
                {t(key)}
                {active && (
                  <span style={{ position: "absolute", bottom: "2px", left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#1D9E75" }} />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* RIGHT: language toggle + donate */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: "99px", overflow: "hidden", fontSize: "0.82rem", fontWeight: "700", fontFamily: NAV_FONT }}>
          <button onClick={() => setLang("en")} style={{ padding: "0.35rem 0.75rem", background: lang === "en" ? "#0A0A0A" : "transparent", color: lang === "en" ? "white" : "#888", border: "none", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}>EN</button>
          <button onClick={() => setLang("es")} style={{ padding: "0.35rem 0.75rem", background: lang === "es" ? "#0A0A0A" : "transparent", color: lang === "es" ? "white" : "#888", border: "none", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}>ES</button>
        </div>
        <motion.a
          href="https://bethematch.org/support-the-cause/donate-financially/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          style={{ padding: "0.5rem 1.1rem", borderRadius: "99px", fontSize: "0.82rem", fontWeight: "800", letterSpacing: "0.06em", textDecoration: "none", color: "white", background: "#1D9E75", display: "block", fontFamily: NAV_FONT, textTransform: "uppercase" }}
        >
          {t("nav.donate")}
        </motion.a>
      </div>
    </motion.nav>
  )
}

export default Navbar
