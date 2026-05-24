import { Link } from "react-router-dom"
import GapMapper from "../GapMapper"

function Home() {
  return (
    <div>
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f4c75 0%, #0d9488 100%)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 1.5rem 4rem", position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15, mixBlendMode: "luminosity" }} />
        <div style={{ maxWidth: "700px", position: "relative", zIndex: 1, color: "white" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: "99px", padding: "0.4rem 1.2rem", fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: "2rem" }}>
            BONE MARROW DONOR GAP
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "900", lineHeight: "1.15", marginBottom: "1.5rem", fontFamily: "Fraunces, serif" }}>
            Someone out there is waiting for someone like you.
          </h1>
          <p style={{ fontSize: "1.15rem", opacity: 0.88, lineHeight: "1.8", marginBottom: "2.5rem", maxWidth: "560px", margin: "0 auto 2.5rem" }}>
            Minority patients face a devastating shortage of bone marrow donors from their own communities. Understanding the gap is the first step to closing it.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/explore" style={{ background: "#f4a261", color: "white", padding: "1rem 2rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
              See your impact
            </Link>
            <Link to="/stories" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "1rem 2rem", borderRadius: "99px", fontWeight: "600", fontSize: "1rem", textDecoration: "none", display: "inline-block", border: "1px solid rgba(255,255,255,0.3)" }}>
              Read stories
            </Link>
          </div>
        </div>
      </div>

      <div style={{ background: "#faf7f2", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "800", marginBottom: "1.5rem", lineHeight: "1.2" }}>
            Why does background matter for bone marrow donation?
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#444", marginBottom: "1.5rem" }}>
            Bone marrow matching is determined by human leukocyte antigens — proteins on the surface of cells. These markers are inherited and vary significantly across ethnic backgrounds. This means a patient's best chance of finding a match almost always comes from someone who shares their heritage.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#444", marginBottom: "3rem" }}>
            The problem is that the current donor registry is overwhelmingly white. A white patient has a 79% chance of finding a match. A Black patient has just 29%. A mixed-race patient may have as little as 22%. Every person from an underrepresented community who joins the registry directly improves those odds for patients who look like them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
            {[
              { stat: "79%", label: "Match chance for white patients", color: "#2a9d8f" },
              { stat: "29%", label: "Match chance for Black patients", color: "#e63946" },
              { stat: "22%", label: "Match chance for mixed-race patients", color: "#e63946" },
              { stat: "7M+", label: "Patients searching for a match globally", color: "#0f4c75" },
            ].map(({ stat, label, color }) => (
              <div key={stat} style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "800", color, fontFamily: "Fraunces, serif" }}>{stat}</div>
                <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.5rem", lineHeight: "1.5" }}>{label}</div>
              </div>
            ))}
          </div>
          <GapMapper />
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #0f4c75, #0d9488)", padding: "5rem 1.5rem", textAlign: "center", color: "white" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1rem" }}>
            Ready to find out where you stand?
          </h2>
          <p style={{ opacity: 0.85, lineHeight: "1.7", marginBottom: "2rem" }}>
            Enter your background and see exactly how many patients like you are searching for a match right now.
          </p>
          <Link to="/explore" style={{ background: "#f4a261", color: "white", padding: "1rem 2.5rem", borderRadius: "99px", fontWeight: "700", fontSize: "1rem", textDecoration: "none", display: "inline-block" }}>
            Explore your impact
          </Link>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "2rem", color: "#aaa", fontSize: "0.85rem", borderTop: "1px solid #eee" }}>
        Built to close the bone marrow donor gap. Data sourced from Be The Match and NMDP.
      </div>
    </div>
  )
}

export default Home
