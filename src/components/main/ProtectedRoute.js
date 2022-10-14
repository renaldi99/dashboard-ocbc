import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo }) => {
  if (sessionStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default ProtectedRoute;
