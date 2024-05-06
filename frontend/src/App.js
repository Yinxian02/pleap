import React from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
/* for testing only */
import Signup from './pages/Signup'

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Profile from './pages/Profile'
import Lessons from './pages/Lessons'
import RequireAuth from './components/RequireAuth';
import Missing from './pages/Missing';

import LessonsList from './components/lessons-list.component'
import CreateLesson from './components/create-lesson.component'
import EditLesson from './components/edit-lesson.component'
import ProfileQuiz from './components/profile-quiz.component'

const ROLES = {
  'User': 2001,
  'Editor': 2020,
  'Admin': 5150
}

function App() {

  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

            <Route path="/" element={<RequireAuth allowedRoles={[ROLES.User]} redirectTo="/classes" fallback={<Navigate to="/login" />} />}>
              <Route index element={<Navigate to="/classes" />} />
            </Route>
            
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='profile' element={<Profile/>}/>
              <Route path='profile-quiz' element={<ProfileQuiz/>}/>
              <Route path='lessons' element={<Lessons/>}>
                <Route path='lessons-list' element={<LessonsList/>}/> 
                <Route path='create-lesson' element={<CreateLesson/>}/> 
                <Route path= 'edit-lesson/:id' element={<EditLesson/>} />
              </Route>
            </Route>

            <Route path="*" element={<Missing />} />
          </Routes>      
      </Router>
    </>
  );
}

export default App;
