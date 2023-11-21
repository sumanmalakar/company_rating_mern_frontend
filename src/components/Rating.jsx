import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BiSolidUserCircle } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import context from "../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rating = ({ id, totalStars, ratings }) => {
  
  const auth = useContext(context);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;

    // Set the average rating in the component state
    setAverageRating(average);

  //  console.log("average rating = ", roundedAverage)
  }, [ratings]);


const [rating, setRating] = useState(0);

const handleRatingSubmit = async (selectedRating) => {
//   alert(`Submitted rating: ${selectedRating}`);


  console.log("The total rating = ", rating)

      try {
        const api = await axios.post(
          `https://company-rating-mern-api.onrender.com/api/company/rating/${id}`,
          {
            rating
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // console.log(api);
        toast.success(`${rating} Star Rating added Successfully`, {
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
      }




 
};

const handleStarClick = (starIndex) => {
  setRating(starIndex + 1);
};

const handleSubmit = () => {
 
  if (rating > 0) {
   
    handleRatingSubmit(rating);
   
    setRating(0);
  } else {
    alert("Please select a rating before submitting.");
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
      <div>
        <h2>Average Rating: {averageRating.toFixed(2)}</h2>

        <div>
          {auth.isAuthenticated && (
            <>
              {[...Array(totalStars)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  style={{
                    cursor: "pointer",
                    color: index < rating ? "gold" : "white",
                    fontSize: "2rem",
                  }}
                >
                  &#9733; {/* Unicode star character */}
                </span>
              ))}
              <button className="btn btn-warning mx-5" onClick={handleSubmit}>
                Submit Rating
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Rating