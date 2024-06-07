import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

const Rating = ({ id }) => {
  const { auth } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (rating !== 0) {
      addRatingToDatabase();
    }
  }, [rating]);
    
  const addRatingToDatabase = async () => {
    console.log(auth.id, id, rating);
    const request = {
        userId: auth.id,
        learningObjectId: id,
        rating: rating,
    };

    try {
      const res = await axios.post(
        'http://localhost:5001/ratings/add',
        request,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
            mode: 'cors',
            withCredentials: true,
          },
        }
      );
      console.log('Rating added:', res.data); 
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  return (
    <div className="rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
