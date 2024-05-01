import React from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
/* for testing only */
import Signup from './pages/Signup'

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Profile from './pages/Profile'
import Classes from './pages/Classes'
import RequireAuth from './components/RequireAuth';
import Missing from './pages/Missing';

import ExercisesList from './components/exercises-list.component'
import CreateExercise from './components/create-exercise.component'
import EditExercise from './components/edit-exercise.component'
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
              <Route path='classes' element={<Classes/>}>
                <Route path='exercises-list' element={<ExercisesList/>}/> 
                <Route path='create-exercise' element={<CreateExercise/>}/> 
                <Route path= 'edit-exercise/:id' element={<EditExercise/>} />
              </Route>
            </Route>

            <Route path="*" element={<Missing />} />
          </Routes>      
      </Router>
    </>
  );
}

export default App;
