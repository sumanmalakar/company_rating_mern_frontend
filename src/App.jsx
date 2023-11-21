import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllCompany from "./pages/AllCompany";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateCompany from "./pages/CreateCompany";
import LoginHome from "./pages/LoginHome";
import Navbar from "./components/Navbar";
import context from "./context/AuthContext";

const App = () => {
  const navigate = useNavigate();
  const auth = useContext(context);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginHome />} />
        <Route
          path="/loginuser"
          element={
            <Login
              url={
                "https://company-rating-mern-api.onrender.com/api/users/login"
              }
              redirectTo={"/allcompany"}
            />
          }
        />
        <Route
          path="/loginadmin"
          element={
            <Login
              url={
                "https://company-rating-mern-api.onrender.com/api/admin/login"
              }
              redirectTo={"/createcompany"}
            />
          }
        />
        <Route
          path="/registeruser"
          element={
            <Register
              url={
                "https://company-rating-mern-api.onrender.com/api/users/register"
              }
              navigateTo={"/loginuser"}
            />
          }
        />
        <Route
          path="/registeradmin"
          element={
            <Register
              url={
                "https://company-rating-mern-api.onrender.com/api/admin/register"
              }
              navigateTo={"/loginadmin"}
            />
          }
        />

        <Route path="/createcompany" element={<CreateCompany />} />
        <Route path="/allcompany" element={<AllCompany />} />

      </Routes>
    </>
  );
};

export default App;
