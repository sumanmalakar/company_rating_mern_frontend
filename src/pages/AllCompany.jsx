import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import axios from "axios";


const AllCompany = () => {
  const [company, setCompany] = useState([]);
   

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(
        `https://company-rating-mern-api.onrender.com/api/company/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(api.data.companys);
      setCompany(api.data.companys);
    };

    fetchBlog();
  }, []);

  return (
    <>
      <div className="container text-center my-5" style={{ width: "56%" }}>
        {company.map((data) => {
          return (
            <>
              <div
                className="card mb-3 bg-secondary text-light my-5"
                style={{ maxWidth: "760px" }}
              >
                <div className="row g-0">
                  <div
                    className="col-md-4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={data.imgUrl}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title">{data.name}</h2>
                      {/* <p className="card-text">{data}</p>
        <p className="card-text"><small >{data.createdAt}</small></p> */}
                      <Rating totalStars={5} id={data._id} ratings={data.ratings} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AllCompany;
