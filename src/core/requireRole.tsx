import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getRole } from "../modules/login/services/loginService";

const ROLE_HOME: Record<string, string> = {
  admin: "/dashboard",
  jurnal: "/buat-berita",
  guru: "/dashboard",
};

function RequireRole({ roles, children }: { roles: string[]; children: ReactNode }) {
  const role = getRole();

  if (!role || !roles.includes(role)) {
    return <Navigate to={ROLE_HOME[role ?? "user"] ?? "/"} replace />;
  }

  return children;
}

export default RequireRole;
