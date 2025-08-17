
import { useSelector } from "react-redux";
import { Navigate,  useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles ,children}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  // Block immediately if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location, forceLogin: true }} replace />;
  }

  // 2. Block if role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  return children;
};

export default ProtectedRoutes;
