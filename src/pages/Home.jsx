import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-center my-5">
        <div
          onClick={() => navigate("/registeruser")}
          className="btn btn-primary mx-3"
        >
          RegisterUser
        </div>
        <div
          onClick={() => navigate("/registeradmin")}
          className="btn btn-warning"
        >
          RegisterAdmin
        </div>
      </div>
    </>
  );
}

export default Home