import React, { useState } from 'react';

const Difficulty = ({ onLevelChange }) => {
const [rating, setRating] = useState(0);

const handleRating = (index) => {
    setRating(index);
    if (onLevelChange) {
        onLevelChange(index);
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
            onClick={() => handleRating(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default Difficulty;