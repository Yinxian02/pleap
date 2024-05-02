import { useState ,useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { auth } = useContext(AuthContext);
  const id = auth.id; 
  const email = auth.email; 

  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState({
    active: 0, 
    reflexive: 0, 
    sensing: 0,
    intuitive: 0, 
    visual: 0,
    verbal: 0,
    sequential: 0, 
    global: 0
  });

  const preferenceList = Object.keys(preferences).map((key, index) => (
    <div class='progress-line' key={index}>
      {key}: {preferences[key].toString()}
    </div>
  ));

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setName(data.userName);
        setPreferences({
          active: data.learningPreferences.active, 
          reflexive: data.learningPreferences.reflexive, 
          sensing: data.learningPreferences.sensing,
          intuitive: data.learningPreferences.intuitive, 
          visual: data.learningPreferences.visual,
          verbal: data.learningPreferences.verbal,
          sequential: data.learningPreferences.sequential, 
          global: data.learningPreferences.global
        })
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id, auth.accessToken]);

  return (
    <>
      <main>
        <div className="profile-container">
            <span>Email:</span>
            <span>{email}</span>
            <br/>
            <span>Name:</span>
            <span>{name}</span>
            <br/>
            <span>Learning Preferences: {preferenceList}</span>

            <span className="button-link">
              <Link to="/profile-quiz">
                <button>
                Figure out your learning preferences.
                </button> 
              </Link> 
            </span> 
        </div>
      </main>
    </>
  );
}

export default Profile;