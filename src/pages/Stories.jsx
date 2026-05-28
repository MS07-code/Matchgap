import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLang } from "../context/LanguageContext"

// English stories
const storiesEn = {
  "White / Caucasian": [
    { name: "Sarah, 26", location: "Ohio", quote: "I registered at a college drive and forgot about it for three years. Then I got the call. Being someone's match was surreal." },
    { name: "Tom, 38", location: "Minnesota", quote: "It took about a week to fully recover. Knowing a stranger is alive because of me is something I cannot put into words." },
  ],
  "Hispanic / Latino": [
    { name: "Maria, 28", location: "Texas", quote: "I was nervous about what my family would think. But when I explained it to my abuela, she cried and said it was the most beautiful thing I could do." },
    { name: "Carlos, 34", location: "California", quote: "The process was easier than I expected. I took a week off work and was back to normal quickly. The family I helped will never know me but I think about them every day." },
  ],
  "Black / African American": [
    { name: "Jasmine, 25", location: "Georgia", quote: "Black patients have the hardest time finding matches. When I learned that, I signed up immediately. It took 2 years but I finally got the call." },
    { name: "DeShawn, 31", location: "Illinois", quote: "My pastor initially had concerns but after we researched it together he supported me completely. Our whole church group signed up." },
  ],
  "Asian / Pacific Islander": [
    { name: "Michelle, 29", location: "Hawaii", quote: "Growing up I never thought about this. Then a friend's cousin needed a match and could not find one. I registered that same week." },
    { name: "Kevin, 26", location: "New York", quote: "The donation itself was painless. The hardest part was waiting to hear if the patient recovered. They did." },
  ],
  "South Asian": [
    { name: "Priya, 27", location: "New Jersey", quote: "My parents were worried at first. Once I showed them the research they became my biggest supporters." },
    { name: "Arjun, 33", location: "Washington", quote: "I donated for a South Asian child who had almost no other options. Knowing that is something I carry with me every single day." },
  ],
  "Middle Eastern": [
    { name: "Lena, 30", location: "Michigan", quote: "I asked my imam about it and he said saving a life is one of the highest acts in Islam. That was all I needed to hear." },
    { name: "Omar, 35", location: "Virginia", quote: "Our community is so underrepresented in the registry. I tell everyone I know this is one of the most direct ways to save a life." },
  ],
  "Mixed / Multiracial": [
    { name: "Sofia, 24", location: "Florida", quote: "Being mixed means I am rare in the registry which also means I might be someone's only chance. That responsibility means everything to me." },
    { name: "Jordan, 29", location: "Oregon", quote: "Mixed race patients have the worst odds of finding a match. As a mixed person myself, registering felt like the most obvious thing I could do." },
  ],
  "Native American": [
    { name: "Kai, 32", location: "New Mexico", quote: "Our elders teach us to take care of each other. This is just an extension of that value in a modern way." },
    { name: "Ayasha, 27", location: "Montana", quote: "Native patients are among the hardest to match. I registered because I want future generations to have better odds than we do now." },
  ],
}

// Spanish stories
const storiesEs = {
  "White / Caucasian": [
    { name: "Sarah, 26", location: "Ohio", quote: "Me registré en una campaña universitaria y lo olvidé durante tres años. Luego recibí la llamada. Ser la compatibilidad de alguien fue surrealista." },
    { name: "Tom, 38", location: "Minnesota", quote: "Me tomó aproximadamente una semana recuperarme por completo. Saber que un extraño está vivo gracias a mí es algo que no puedo expresar con palabras." },
  ],
  "Hispanic / Latino": [
    { name: "Maria, 28", location: "Texas", quote: "Estaba nerviosa por lo que pensaría mi familia. Pero cuando se lo expliqué a mi abuela, lloró y dijo que era lo más hermoso que podía hacer." },
    { name: "Carlos, 34", location: "California", quote: "El proceso fue más fácil de lo que esperaba. Tomé una semana libre y volví a la normalidad rápidamente. La familia a la que ayudé nunca me conocerá, pero pienso en ellos todos los días." },
  ],
  "Black / African American": [
    { name: "Jasmine, 25", location: "Georgia", quote: "Los pacientes negros tienen la mayor dificultad para encontrar compatibilidades. Cuando lo supe, me inscribí de inmediato. Tardé 2 años, pero finalmente recibí la llamada." },
    { name: "DeShawn, 31", location: "Illinois", quote: "Mi pastor tuvo dudas al principio, pero después de investigarlo juntos me apoyó completamente. Todo nuestro grupo de la iglesia se inscribió." },
  ],
  "Asian / Pacific Islander": [
    { name: "Michelle, 29", location: "Hawaii", quote: "Creciendo nunca pensé en esto. Luego un primo de una amiga necesitó una compatibilidad y no pudo encontrarla. Me registré esa misma semana." },
    { name: "Kevin, 26", location: "New York", quote: "La donación en sí fue indolora. Lo más difícil fue esperar para saber si el paciente se recuperó. Sí lo hizo." },
  ],
  "South Asian": [
    { name: "Priya, 27", location: "New Jersey", quote: "Mis padres estaban preocupados al principio. Cuando les mostré la investigación, se convirtieron en mis mayores apoyos." },
    { name: "Arjun, 33", location: "Washington", quote: "Doné para un niño del sur de Asia que casi no tenía otras opciones. Saber eso es algo que llevo conmigo todos los días." },
  ],
  "Middle Eastern": [
    { name: "Lena, 30", location: "Michigan", quote: "Le pregunté a mi imán sobre esto y dijo que salvar una vida es uno de los actos más elevados en el Islam. Eso fue todo lo que necesitaba escuchar." },
    { name: "Omar, 35", location: "Virginia", quote: "Nuestra comunidad está muy subrepresentada en el registro. Le digo a todos los que conozco que esta es una de las formas más directas de salvar una vida." },
  ],
  "Mixed / Multiracial": [
    { name: "Sofia, 24", location: "Florida", quote: "Ser de raza mixta significa que soy rara en el registro, lo que también significa que podría ser la única oportunidad de alguien. Esa responsabilidad lo significa todo para mí." },
    { name: "Jordan, 29", location: "Oregon", quote: "Los pacientes de raza mixta tienen las peores probabilidades de encontrar una compatibilidad. Como persona mixta, registrarme fue lo más obvio que podía hacer." },
  ],
  "Native American": [
    { name: "Kai, 32", location: "New Mexico", quote: "Nuestros ancianos nos enseñan a cuidarnos mutuamente. Esto es solo una extensión de ese valor de forma moderna." },
    { name: "Ayasha, 27", location: "Montana", quote: "Los pacientes nativos son de los más difíciles de compatibilizar. Me registré porque quiero que las generaciones futuras tengan mejores probabilidades de las que tenemos ahora." },
  ],
}

const communityKeyMap = {
  "White / Caucasian":        "community.white",
  "Hispanic / Latino":        "community.hispanic",
  "Black / African American": "community.black",
  "Asian / Pacific Islander": "community.asian",
  "South Asian":              "community.southasian",
  "Middle Eastern":           "community.middleeastern",
  "Mixed / Multiracial":      "community.mixed",
  "Native American":          "community.native",
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.2 } },
}

function PhotoPlaceholder() {
  return (
    <div style={{ width: 48, height: 48, borderRadius: "10px", background: "linear-gradient(135deg, #1D9E75 0%, #0a6b4e 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  )
}

function StoryCard({ name, location, quote, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.1)" }}
      style={{ background: "white", borderRadius: "16px", padding: "1.75rem", borderLeft: "4px solid #1D9E75", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      <p style={{ margin: "0 0 1.25rem", lineHeight: "1.8", color: "#333", fontStyle: "italic", fontSize: "1rem" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <PhotoPlaceholder />
        <div>
          <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>{name}</div>
          <div style={{ fontSize: "0.8rem", color: "#888" }}>{location}</div>
        </div>
      </div>
    </motion.div>
  )
}

function Stories() {
  const { lang, t } = useLang()
  const stories = lang === "es" ? storiesEs : storiesEn
  const [selected, setSelected] = useState("All")
  const communities = Object.keys(storiesEn)
  const displayed = selected === "All" ? Object.values(stories).flat() : stories[selected] || []

  function chipLabel(key) {
    if (key === "All") return t("community.all")
    return t(communityKeyMap[key] || key)
  }

  return (
    <div style={{ paddingTop: "5rem", background: "#faf7f2", minHeight: "100vh" }}>

      {/* Header — dark, left-aligned */}
      <div style={{ background: "#0A0A0A", padding: "5rem 2rem 4.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "900", lineHeight: "1.08", marginBottom: "1rem", fontFamily: "Lora, serif", color: "#F0EDE8", letterSpacing: "-0.01em" }}
          >
            {t("stories.heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "rgba(240,237,232,0.65)", fontSize: "1.1rem", maxWidth: "480px", lineHeight: "1.8" }}
          >
            {t("stories.subtext")}
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}
        >
          {["All", ...communities].map((c) => (
            <motion.button
              key={c}
              onClick={() => setSelected(c)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "0.5rem 1rem", borderRadius: "99px", fontSize: "0.85rem", fontWeight: "600", border: "1px solid #1D9E75", cursor: "pointer", background: selected === c ? "#1D9E75" : "white", color: selected === c ? "white" : "#1D9E75", transition: "background 0.2s, color 0.2s" }}
            >
              {chipLabel(c)}
            </motion.button>
          ))}
        </motion.div>

        {/* Story cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <AnimatePresence mode="wait">
            {displayed.map((story, i) => (
              <StoryCard key={`${selected}-${i}`} {...story} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA — dark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: "3rem", background: "#0A0A0A", borderRadius: "20px", padding: "2.5rem", textAlign: "center", color: "#F0EDE8" }}
        >
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "900", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{t("stories.cta.heading")}</h2>
          <p style={{ color: "rgba(240,237,232,0.7)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            {t("stories.cta.body")}
          </p>
          <motion.a
            href="mailto:joinmatchgap@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ background: "#1D9E75", color: "white", borderRadius: "99px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", textDecoration: "none", display: "inline-block" }}
          >
            {t("stories.cta.btn")}
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

export default Stories
