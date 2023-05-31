import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ element: Component }) => {
  const userState = useSelector((state) => state.userReducer);
  let { isLoggedIn } = userState.user;
  return isLoggedIn ? <Component /> : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
