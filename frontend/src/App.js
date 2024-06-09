import React from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
/* for testing only */
import Signup from './pages/Signup'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import Lessons from './pages/Lessons'
import LessonWrapper from './pages/Lesson'
import AddLesson from './pages/AddLesson'
import RequireAuth from './components/RequireAuth';
import Missing from './pages/Missing';
import ProfileQuiz from './components/profile-quiz.component'
import ProfileIcon from './components/ProfileIcon'
import LessonIcon from './components/LessonIcon'

const ROLES = {
  'User': 2001,
  'Editor': 2020,
  'Admin': 5150
}

function App() {

  return (
    <>
      <Router>
        <div className='top-navigation-bar'>
          {/* <Navbar/> */}
          <LessonIcon className='lessons-icon'/>
          <ProfileIcon className='profile-icon'/>
        </div>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>

          <Route path="/" element={<RequireAuth allowedRoles={[ROLES.User]} redirectTo="/lessons" fallback={<Navigate to="/login" />} />}>
            <Route index element={<Navigate to="/lessons" />} />
          </Route>
          
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='profile' element={<Profile/>}/>
            <Route path='profile-quiz' element={<ProfileQuiz/>}/>
            <Route path='lessons' element={<Lessons/>}/>
            <Route path='lesson/:id' element={<LessonWrapper/>}/>
            <Route path='create-lesson' element={<AddLesson/>}/> 
          </Route>

          <Route path="*" element={<Missing/>} />
        </Routes>      
      </Router>
    </>
  );
}

export default App;
