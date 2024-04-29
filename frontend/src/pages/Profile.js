import React from 'react'
import '../styles/Profile.css'
import { NavLink, Outlet } from "react-router-dom";

function Profile() {
    const Navigation = () => {
      return (
        <nav>
          <NavLink to='profile-quiz'>Figure out your preference!</NavLink>  
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

export default Profile;


