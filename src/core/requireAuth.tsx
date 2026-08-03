import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
