import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CourseCatalog from "./features/courses/pages/CourseCatalog";
import Navigation from "./ui/Navigation";
import Footer from "./ui/Footer";
import CourseDetail from "./features/courses/pages/CourseDetail";
import LessonDetails from "./features/courses/pages/LessonDetails";

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
            <Route path=":courseId/:lessonId" element={<LessonDetails />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
