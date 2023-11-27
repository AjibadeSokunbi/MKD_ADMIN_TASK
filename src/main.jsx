import React, { useContext } from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {

  switch (role) {

    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );

  }
}

function Main() {
  const { state, dispatch } = useContext(AuthContext);

  React.useEffect(() => {

    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {

      dispatch({
        type: "LOGIN",
        payload: {
          token: storedToken,
          role: storedRole,
          user_id: localStorage.getItem("user_id"),
        },
      });
    }
  }, [dispatch]);



  return (
    <div className={`${state.isAuthenticated && "bg-[#111]"} h-full`}>
      <div className="flex w-full">
        <div className="w-full">
          <div className={`page-wrapper w-full  ${!state.isAuthenticated ? "py-10" : "py-5"} px-5`}>
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
