import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

function AuthLayout({ onCreateRoom }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <>
      <Navbar onCreateRoom={onCreateRoom} onLogout={handleLogout} />
      <Outlet />
    </>
  );
}

export default AuthLayout;
