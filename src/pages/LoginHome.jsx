import React from "react";
import { useNavigate } from "react-router-dom";

const LoginHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-center my-5">
        <div
          onClick={() => navigate("/loginuser")}
          className="btn btn-primary mx-3"
        >
          Login User
        </div>
        <div
          onClick={() => navigate("/loginadmin")}
          className="btn btn-warning"
        >
          Login Admin
        </div>
      </div>
    </>
  );
};

export default LoginHome;
