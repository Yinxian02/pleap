import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Lesson.css";

function Lessons() {

  const Navigation = () => {
    return (
      <nav className="lessons-nav">
        <NavLink className="lessons-nav-item" to='lessons-list'>My Lessons</NavLink>
        <NavLink className="lessons-nav-item" to='create-lesson'>Create Lesson</NavLink>  
      </nav>
    );
  };

  return (
    <>
      <Navigation/>

      <main>
        <Outlet/>
      </main>

      
    </>
  );
}

export default Lessons;