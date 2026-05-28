import { Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Stories from "./pages/Stories"
import About from "./pages/About"
import JoinRegistry from "./pages/JoinRegistry"

function App() {
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/join" element={<JoinRegistry />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}

export default App
