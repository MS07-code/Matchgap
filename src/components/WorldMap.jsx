import { motion } from "framer-motion"
import {
  ComposableMap,
  Geographies,
  Geography,
  useMapContext,
} from "react-simple-maps"

const GEO_URL    = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
const MAP_WIDTH  = 800
const MAP_HEIGHT = 400

// [longitude, latitude]
const IRELAND    = [-8.24,  53.41]
const NEW_JERSEY = [-74.5,  40.1]
const ARC_CTRL   = [-41.0,  61.0]   // control point — arcs north over the Atlantic

// ── Pulsing endpoint dot ────────────────────────────────────────────────────
function PulseDot({ x, y, delay }) {
  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={9}
        fill="none"
        stroke="#EF9F27"
        strokeWidth={1.5}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.6, 0.4], opacity: [0, 0.45, 0] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
          repeatDelay: 0.4,
        }}
      />
      <motion.circle
        cx={x} cy={y} r={3.5}
        fill="#EF9F27"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay }}
      />
    </g>
  )
}

// ── Arc + dots + story card — inside ComposableMap to access projection ─────
function ArcLayer() {
  const { projection } = useMapContext()

  const ir   = projection?.(IRELAND)
  const nj   = projection?.(NEW_JERSEY)
  const ctrl = projection?.(ARC_CTRL)

  if (!ir || !nj || !ctrl) return null

  const d = `M${ir[0]},${ir[1]} Q${ctrl[0]},${ctrl[1]} ${nj[0]},${nj[1]}`

  // Story card dimensions in SVG units
  const CARD_W = 215
  const CARD_H = 88

  return (
    <g>
      {/* Wide ambient glow — pulses after the draw finishes */}
      <motion.path
        d={d}
        fill="none"
        stroke="#EF9F27"
        strokeWidth={10}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2.8, ease: "easeInOut" }}
      />
      {/* Main arc — draws itself from Ireland to NJ over 2s */}
      <motion.path
        d={d}
        fill="none"
        stroke="#EF9F27"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
      />
      {/* Endpoint glow dots */}
      <PulseDot x={ir[0]} y={ir[1]} delay={2.7} />
      <PulseDot x={nj[0]} y={nj[1]} delay={2.9} />

      {/* Story card — foreignObject lets us use HTML inside the SVG */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.2 }}
      >
        <foreignObject
          x={nj[0] + 10}
          y={nj[1] + 6}
          width={CARD_W}
          height={CARD_H}
        >
          <div
            style={{
              background: "#141414",
              borderLeft: "3px solid #1D9E75",
              borderRadius: "0 8px 8px 0",
              padding: "11px 13px",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                color: "#F0EDE8",
                fontSize: "12px",
                fontFamily: "Lora, serif",
                fontStyle: "italic",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              "A donor in Ireland saved my father's life. That's why Matchgap exists."
            </p>
          </div>
        </foreignObject>
      </motion.g>
    </g>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function WorldMap() {
  return (
    <section style={{ background: "#0A0A0A", padding: "6rem 1.5rem 5rem" }}>

      {/* Section header */}
      <div style={{ maxWidth: "860px", margin: "0 auto 3.5rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Lora, serif",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 700,
            color: "#F0EDE8",
            lineHeight: 1.1,
            marginBottom: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          The registry has no borders
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{
            color: "rgba(240,237,232,0.5)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}
        >
          A donor anywhere can save a patient anywhere. The gap follows minority communities worldwide.
        </motion.p>
      </div>

      {/* Map */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <ComposableMap
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 160, center: [0, 20] }}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a1a1a"
                  stroke="#2a2a2a"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          <ArcLayer />
        </ComposableMap>
      </div>

      {/* Below-map caption + CTA */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <p style={{
          color: "rgba(240,237,232,0.35)",
          fontSize: "0.82rem",
          lineHeight: 1.7,
          maxWidth: "480px",
          margin: "0 auto 1.75rem",
        }}>
          Be The Match connects donors and patients across 60+ countries.
          Registering anywhere helps everyone.
        </p>
        <motion.a
          href="https://bethematch.org/support-the-cause/donate-bone-marrow/join-the-marrow-registry/before-you-join/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#1D9E75",
            color: "white",
            fontWeight: 700,
            fontSize: "0.95rem",
            padding: "0.875rem 2rem",
            borderRadius: "99px",
            textDecoration: "none",
            fontFamily: "'Nunito Sans', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          Join the global registry →
        </motion.a>
      </div>

    </section>
  )
}
