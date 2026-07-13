import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children, organizerOnly = false }) {
  const { user, loading, isOrganizer } = useAuth();

  if (loading) return <Loader label="جاري التحقق من الحساب..." />;

  if (!user) return <Navigate to="/login" replace />;

  if (organizerOnly && !isOrganizer) return <Navigate to="/" replace />;

  return children;
}
