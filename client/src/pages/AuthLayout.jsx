import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

function AuthLayout() {
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      nav("/login");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthLayout;
