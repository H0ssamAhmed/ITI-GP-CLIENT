import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseRole from "./features/auth/pages/ChooseRole";
import SignUp from "./features/auth/pages/SignUp";
import Login from "./features/auth/pages/Login";
import CodeVerify from "./features/auth/pages/CodeVerify";
import VerifyEmail from "./features/auth/pages/VerifyEmail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/signup-student" element={<SignUp />} />
        <Route path="/login" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
