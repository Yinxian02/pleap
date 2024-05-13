import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Lesson.css";

function Lessons() {

  return (
    <>

      <main>
        <div className="lesson-div">
          <Link to="/lesson">
            <p>hi</p>
          </Link>
        </div>
      </main>

      
    </>
  );
}

export default Lessons;