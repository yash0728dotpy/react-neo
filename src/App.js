import { APOD } from "./pages/APOD.js";
import { NEO } from "./pages/NEO.js";
import { Nav } from "./components/Nav.js";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer.js";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<APOD />} />
        <Route path="/neo" element={<NEO />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
