import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import Teachers from "./features/teacher/pages/Teachers";

function App() {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </Router>

  </div>;
}

export default App;
