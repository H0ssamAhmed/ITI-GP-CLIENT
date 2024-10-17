import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUp from "./features/auth/pages/SignUp";
import Login from "./features/auth/pages/Login";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
import CodeVerify from "./features/auth/pages/CodeVerify";
import ForgetPassword from "./features/auth/pages/ForgetPassword";
import Home from "./pages/Home";
import CourseCatalog from "./features/courses/pages/CourseCatalog";
import CourseDetail from "./features/courses/pages/CourseDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LessonDetails from "./features/courses/pages/LessonDetails";
import MainLayout from "./layouts/Mainlayout";
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
import { transformedClasses } from "./lib/data";
import Exam from "./features/courses/pages/Exam";
import ReviewAns from "./features/courses/pages/ReviewAns";
import Error from "./pages/Error";
import ProfileDetails from "./pages/ProfileDetails";
import Features from "./pages/Features";
import "react-toastify/dist/ReactToastify.css";
import Wallet from "./features/payment/pages/Wallet";
import Checkout from "./features/payment/pages/checkout";
import PlatformRequestsList from "./features/dashboard/lists/PlatformRequestsList";
import AuthLayout from "./layout/AuthLayout";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ui/ProtectedRoute";
import { useState } from "react";
import SignUpContext from "./features/store/signup-context";
import TeacherSubjectsList from "./features/dashboard/lists/TeacherSubjectsList";
import EnrolledStudents from "./features/dashboard/lists/EnrolledStudents";
import TeacherLessons from "./features/dashboard/lists/TeacherLessons";
import CreateLesson from "./features/dashboard/lists/CreateLesson";
import ParentLogin from "./components/ParentLogin";
import Certificate from "./pages/Certificate";
function App() {
  const role = useSelector((state) => state.auth.role);
  const [type, setType] = useState("student");
  const handleTypeChange = (newType) => {
    setType(newType);
  };
  return (
    <>
      <SignUpContext.Provider value={{ type, handleTypeChange }}>
        <Router>
          <Routes>
            {/* Main layout routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about-us" element={<About />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/checkout" element={<Checkout />} />
              <Route path="/ProfileDetails" element={<ProfileDetails />} />
              <Route path="/features" element={<Features />} />
              <Route path="/parentLogin" element={<ParentLogin />} />
              <Route path="courses" element={<Outlet />}>
                <Route index element={<CourseCatalog />} />
                <Route path=":courseId" element={<CourseDetail />} />
                <Route path=":courseId/:lessonId" element={<LessonDetails />} />
                <Route path="quiz/:courseId/:quizId" element={<Exam />} />
                <Route
                  path="quiz/quizReview/:quizTitle"
                  element={<ReviewAns />}
                />
              </Route>
            </Route>

            {/* Authentication routes with AuthLayout */}
            <Route path="/" element={<AuthLayout />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password-email" element={<VerifyEmail />} />
              <Route path="/verify-otp" element={<CodeVerify />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route>

            {/* Redirect based on role when accessing userHome */}
            <Route
              path="/dashboard/userHome"
              element={
                <ProtectedRoute
                  role={role}
                  allowedRoles={["admin", "teacher", "student", "parent"]}
                >
                  {role === "admin" ? (
                    <Navigate to="/dashboard/admin" />
                  ) : role === "teacher" ? (
                    <Navigate to="/dashboard/teacher" />
                  ) : role === "student" ? (
                    <Navigate to="/dashboard/student" />
                  ) : role === "parent" ? (
                    <Navigate to="/dashboard/parent/:parentId" />
                  ) : (
                    <Navigate to="/dashboard/profile" />
                  )}
                </ProtectedRoute>
              }
            />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Admin routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute role={role} allowedRoles={["admin"]}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              {/* Teacher routes */}
              <Route
                path="teacher/"
                element={
                  <ProtectedRoute role={role} allowedRoles={["teacher"]}>
                    <TeacherPage />
                  </ProtectedRoute>
                }
              />
              {/* Student routes */}
              <Route
                path="student"
                element={
                  <ProtectedRoute role={role} allowedRoles={["student"]}>
                    <StudentPage />
                  </ProtectedRoute>
                }
              />
              {/* Parent routes */}
              <Route
                path="/dashboard/parent/:parentId"
                element={<ParentPage />}
              />
              {/* Common routes accessible by all roles */}
              <Route path="profile" element={<ProfileList />} />
              <Route path="list/teachers" element={<TeachersList />} />
              <Route path="list/teachers/:id" element={<TeacherDetails />} />
              <Route path="list/students" element={<StudentsList />} />
              <Route
                path="list/enrolledStudent"
                element={<EnrolledStudents />}
              />
              <Route path="list/students/:id" element={<StudentsDetails />} />
              <Route path="list/parents" element={<ParentsList />} />
              <Route path="list/subjects" element={<SubjectsList />} />
              <Route
                path="list/teacherSubjects"
                element={<TeacherSubjectsList />}
              />
              <Route path="list/messages" element={<MessagesList />} />
              <Route path="list/requests" element={<PlatformRequestsList />} />
              <Route path="list/lessons" element={<CreateCourseList />} />
              <Route path="list/teacherLessons" element={<TeacherLessons />} />
              <Route path="list/create-lesson" element={<CreateLesson />} />
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

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </SignUpContext.Provider>
    </>
  );
}

export default App;
