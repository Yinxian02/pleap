import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Lesson.css";
import CreateLearningObjects from '../components/createLesson';

function CreateLesson() {

  return (
    <>

      <main>
        <CreateLearningObjects/>
      </main>

      
    </>
  );
}

export default CreateLesson;