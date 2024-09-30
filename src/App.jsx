import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ChooseRole from "./features/auth/pages/ChooseRole";
import SignUp from "./features/auth/pages/SignUp";
// import Login from "./features/auth/pages/Login";
// import CodeVerify from "./features/auth/pages/CodeVerify";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
import Home from "./pages/Home";
import CourseCatalog from "./features/courses/pages/CourseCatalog";
// import Navigation from "./ui/Navigation";
// import Footer from "./ui/Footer";
import CourseDetail from "./features/courses/pages/CourseDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LessonDetails from "./features/courses/pages/LessonDetails";
import Mainlayout from "./layouts/mainlayout";
import Login from "./features/auth/pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Home />} />
            {/* <Route path="*" element={<p>this errom</p>} /> */}
            <Route path="contact" element={<Contact />} />
            <Route path="about-us" element={<About />} />
            <Route path="courses" element={<Outlet />}>
              <Route index element={<CourseCatalog />} />
              <Route path="courseId" element={<CourseDetail />} />
              <Route path="courseId/:lessonId" element={<LessonDetails />} />
            </Route>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
