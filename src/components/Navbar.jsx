import { Link, useLocation } from "react-router-dom"

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/stories", label: "Stories" },
  { to: "/ask", label: "Ask" },
]

function Navbar() {
  const location = useLocation()
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <Link to="/" style={{ fontFamily: "Fraunces, serif", fontSize: "1.4rem", fontWeight: "800", color: "#0f4c75", textDecoration: "none" }}>
        MatchGap
      </Link>
      <div style={{ display: "flex", gap: "0.25rem" }}>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{ padding: "0.5rem 1rem", borderRadius: "99px", fontSize: "0.9rem", fontWeight: "500", textDecoration: "none", color: location.pathname === to ? "#0d9488" : "#555", background: location.pathname === to ? "#f0fdfa" : "transparent", transition: "all 0.2s" }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
