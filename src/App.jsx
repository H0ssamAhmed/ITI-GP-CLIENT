import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./features/dashboard/pages/admin/AdminPage";
import TeacherPage from "./features/dashboard/pages/teacher/TeacherPage";
import StudentPage from "./features/dashboard/pages/student/StudentPage";
import ParentPage from "./features/dashboard/pages/parent/ParentPage";
import DashboardLayout from "./layout/DashboardLayout";
import MainLayout from "./layout/MainLayout";
import SignUp from "./features/auth/pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="parent" element={<ParentPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
