import React from 'react';
import "../styles/Lesson.css";
import { Link } from 'react-router-dom';

const Lessons = () => (
  <div>
    <Link to="/create-lesson">
      <p>add lessons to database</p>
    </Link>
  </div>
);

export default Lessons;