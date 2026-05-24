import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Stories from "./pages/Stories"
import Ask from "./pages/Ask"
import Data from "./pages/Data"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </div>
  )
}

export default App