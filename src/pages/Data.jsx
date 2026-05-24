import GapMapper from "../GapMapper"

function Data() {
  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0f4c75 0%, #0d9488 100%)", padding: "4rem 1.5rem", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "1rem" }}>
          The gap by the numbers
        </h1>
        <p style={{ opacity: 0.85, fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
          Where the donor shortage is most severe and which communities need the most support.
        </p>
      </div>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <GapMapper />
      </div>
    </div>
  )
}

export default Data
