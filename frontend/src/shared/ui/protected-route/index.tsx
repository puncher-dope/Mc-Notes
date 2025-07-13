import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMyContext } from "app/provider";
import Cookies from "js-cookie";

export const ProtectedRoute = () => {
  const { router } = useMyContext();
  const token = Cookies.get("token");
  const location = useLocation();
  
  const isAuthenticated = router || token;
  const publicRoutes = ["/register", "/auth"];

  if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/auth" replace />;
  }
   if (isAuthenticated && publicRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }



  return <Outlet />
};
