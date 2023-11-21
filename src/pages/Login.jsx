import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginHome from './LoginHome';


const Login = ({ url, redirectTo }) => {
  // console.log(url)
  const location = useLocation();
  const auth = useContext(context);
  const navigate = useNavigate();

  //    console.log(auth)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password, redirectTo);

    try {
      const api = await axios.post(
        `${url}`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("data send");
      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // auth.setIsAuthenticated(true);

      {
        location.pathname == "/loginadmin" &&
          auth.setIsAuthenticatedAdmin(true);
      }

      {
        location.pathname == "/loginuser" && auth.setIsAuthenticated(true);
      }

      setTimeout(() => {
        navigate(`${redirectTo}`);
      }, 1500);
    } catch (error) {
      // console.error(error)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // auth.setIsAuthenticated(false);

      {
        location.pathname == "/loginadmin" &&
          auth.setIsAuthenticatedAdmin(false);
      }
      

      {
        location.pathname == "/loginuser" && auth.setIsAuthenticated(false);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <LoginHome />

      <div className="container" style={{ width: "45%" }}>
        {location.pathname == "/loginuser" && (
          <h1 className="text-center my-3">Login User</h1>
        )}

        {location.pathname == "/loginadmin" && (
          <h1 className="text-center my-3">Login Admin</h1>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email{" "}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="d-grid gap-2 my-5">
            {location.pathname == "/loginadmin" && (
              <button type="submit" className="btn btn-primary">
                Login Admin
              </button>
            )}
            {location.pathname == "/loginuser" && (
              <button type="submit" className="btn btn-primary">
                Login User
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login