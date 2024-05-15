import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Lesson.css";
import CreateLearningObjects from '../components/createLesson';

function Lessons() {

  return (
    <>

      <main>
        <div className="lesson-div">

          <Link to="/lesson">
            <CreateLearningObjects/>
            <p>hi</p>
          </Link>
        </div>
      </main>

      
    </>
  );
}

export default Lessons;