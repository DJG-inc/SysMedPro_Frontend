import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const loadingPageStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "#f0f2f5",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.5s",
};

export const ProtectedRoute = ({ children }) => {

  // si no existe un token, redirecciona a la pagina de login
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return children;

};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};