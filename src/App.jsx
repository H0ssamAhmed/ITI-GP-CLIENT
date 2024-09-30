import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ChooseRole from "./features/auth/pages/ChooseRole";
import SignUp from "./features/auth/pages/SignUp";
import Login from "./features/auth/pages/Login";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
import Home from "./pages/Home";
import CourseCatalog from "./features/courses/pages/CourseCatalog";
import CourseDetail from "./features/courses/pages/CourseDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LessonDetails from "./features/courses/pages/LessonDetails";
import MainLayout from "./layouts/mainlayout";
import DashboardLayout from "./layout/DashboardLayout";
import AdminPage from "./features/dashboard/pages/admin/AdminPage";
import TeacherPage from "./features/dashboard/pages/teacher/TeacherPage";
import StudentPage from "./features/dashboard/pages/student/StudentPage";
import ParentPage from "./features/dashboard/pages/parent/ParentPage";
import TeachersList from "./features/dashboard/lists/TeachersList";
import StudentsList from "./features/dashboard/lists/StudentsList";
import ParentsList from "./features/dashboard/lists/ParentsList";
import SubjectsList from "./features/dashboard/lists/SubjectsList";
import AnnouncementList from "./features/dashboard/lists/AnnouncementList";
import ClassesList from "./features/dashboard/lists/ClassesList";
import ResultsList from "./features/dashboard/lists/ResultsList";
import TeacherDetails from "./features/dashboard/components/TeacherDetails";
import StudentsDetails from "./features/dashboard/components/StudentsDetails";
import MessagesList from "./features/dashboard/lists/MessagesList";
import ProfileList from "./features/dashboard/components/ProfileDetails";
import CreateCourseList from "./features/dashboard/lists/CreateCourseList";
import ExamsList from "./features/dashboard/lists/ExamsList";
import { role, transformedClasses } from "./lib/data";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
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

        {/* Redirect based on role when accessing userHome */}
        <Route
          path="/dashboard/userHome"
          element={
            role ? (
              role === "admin" ? (
                <Navigate to="/dashboard/admin" />
              ) : role === "teacher" ? (
                <Navigate to="/dashboard/teacher" />
              ) : role === "student" ? (
                <Navigate to="/dashboard/student" />
              ) : role === "parent" ? (
                <Navigate to="/dashboard/parent" />
              ) : (
                <Navigate to="/dashboard/profile" />
              )
            ) : (
              <Navigate to="/" /> // Redirect to home or login if no role found
            )
          }
        />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="parent" element={<ParentPage />} />
          <Route path="profile" element={<ProfileList />} />
          <Route path="list/teachers" element={<TeachersList />} />
          <Route path="list/teachers/:id" element={<TeacherDetails />} />
          <Route path="list/students" element={<StudentsList />} />
          <Route path="list/students/:id" element={<StudentsDetails />} />
          <Route path="list/Parents" element={<ParentsList />} />
          <Route path="list/subjects" element={<SubjectsList />} />
          <Route path="list/messages" element={<MessagesList />} />
          <Route path="list/lessons" element={<CreateCourseList />} />
          <Route path="list/exams" element={<ExamsList />} />
          <Route
            path="list/announcements"
            element={<AnnouncementList userRole={role} />}
          />
          <Route
            path="list/classes"
            element={<ClassesList data={transformedClasses} />}
          />
          <Route path="list/results" element={<ResultsList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
