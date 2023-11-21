import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';




const CreateCompany = () => {
    const auth = useContext(context);
    const navigate = useNavigate();
    //    console.log(auth)

    const [name, setName] = useState("")
    const [imgUrl, setImgUrl] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

      try {
        const api = await axios.post(
          `https://company-rating-mern-api.onrender.com/api/company/new`,
          {
            name,
            imgUrl,
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

        auth.setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/allcompany");
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

        auth.setIsAuthenticated(false);
      }


    }

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
            <div className="container" style={{ width: '45%' }}>

                
                    <h1 className='text-center my-3'>Create Comapny</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 my-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Company Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" className="form-control" id="exampletext" aria-describedby="emailHelp"
                            required
                             />

                    </div>
                
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Company Logo URL</label>
                        <input
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            type="text" className="form-control" id="exampleInputPassword1"
                            required />
                    </div>
                    <div className="d-grid gap-2 my-5">
                        <button type="submit" className="btn btn-primary">Create Company</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCompany;