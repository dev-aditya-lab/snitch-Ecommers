import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function GuestOnly({ children }) {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
