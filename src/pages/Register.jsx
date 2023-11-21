import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import context from "../context/AuthContext";
import Home from "./Home";

const Register = ({ url, navigateTo }) => {
  const location = useLocation();
  const auth = useContext(context);
  const navigate = useNavigate();
  //    console.log(auth)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api = await axios.post(
        `${url}`,
        {
          name,
          email,
          phone,
          city,
          state,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(api);
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

      // isAuthenticatedAdmin, setIsAuthenticatedAdmin,

      {
        location.pathname == "/registeradmin" &&
          auth.setIsAuthenticatedAdmin(true);
      }

      {
        location.pathname == "/registeruser" && auth.setIsAuthenticated(true);
      }

      setTimeout(() => {
        navigate(`${navigateTo}`);
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
        location.pathname == "/registeradmin" &&
          auth.setIsAuthenticatedAdmin(false);
      }

      {
        location.pathname == "/registeruser" && auth.setIsAuthenticated(false);
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
      <Home />

      <div className="container my-2 " style={{ width: "45%" }}>
        {location.pathname == "/registeruser" && (
          <h1 className="text-center my-3">Register As User</h1>
        )}

        {location.pathname == "/registeradmin" && (
          <h1 className="text-center my-3">Register As Admin</h1>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampletext"
              aria-describedby="emailHelp"
              required
            />
          </div>
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
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword120"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword01"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              State
            </label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPasswordx1"
              required
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
              required
            />
          </div>

          <div className="d-grid gap-2 my-5">
            {location.pathname == "/registeruser" && (
              <button type="submit" className="btn btn-primary">
                Register User
              </button>
            )}

            {location.pathname == "/registeradmin" && (
              <button type="submit" className="btn btn-primary">
                Register Admin
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
