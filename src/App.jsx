import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Navigation from './ui/Navigation';
import Footer from './ui/Footer';
import AboutLayout from './ui/AboutLayout';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutLayout />}>
            <Route index element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
