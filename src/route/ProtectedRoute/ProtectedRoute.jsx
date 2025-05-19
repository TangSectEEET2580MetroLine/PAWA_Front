import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../../auth/state/AuthProvider";

const ProtectedRoute = ({ children, accessRole }) => {
  const { state } = useContext(AuthContext);
  const location = useLocation();

  // If not logged in or role not allowed, redirect to login
  if (!state.token || (accessRole && !accessRole.includes(state.role))) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;