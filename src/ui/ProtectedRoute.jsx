import { Navigate } from "react-router-dom";

// A component that protects routes based on user authentication and role
const ProtectedRoute = ({ children, role, allowedRoles }) => {
  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.includes(role))
    return <Navigate to={`/dashboard/${role}`} />;
  return children;
};

export default ProtectedRoute;