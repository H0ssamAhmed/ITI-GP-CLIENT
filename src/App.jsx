import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CourseCatalog from "./features/courses/pages/CourseCatalog";
import Navigation from "./ui/Navigation";
import Footer from "./ui/Footer";
import CourseDetail from "./features/courses/pages/CourseDetail";

function App() {
  return (
    <div>

      <Navigation />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Outlet />}>
            <Route index element={<CourseCatalog />} />
            <Route path=":courseId" element={<CourseDetail />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
