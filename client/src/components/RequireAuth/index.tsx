import { Navigate, Outlet } from "react-router-dom";

export function RequireAuth() {
  const isAuthenticated = true; // ou use contexto

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}