import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
function Classes() {

  const Navigation = () => {
    return (
      <nav>

        <NavLink to='exercises-list'>List of Exercises</NavLink>
        <NavLink to='create-exercise'>Create Exercise</NavLink>  

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

export default Classes;