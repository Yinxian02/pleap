import { useState ,useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import "../styles/Profile.css";

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
        // console.log(preferences);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id, auth.accessToken]);

  return (
    <>
      <main>
        <div className="profile-container">
            <h2>Email:</h2>
            <span className="detail">{email}</span>
            <br/>
            <h2>Name:</h2>
            <span className="detail">{name}</span>
            <br/>
            <h2>Learning Preferences:</h2>
            <br/>

            <div class="bar">
              <span>Active / Reflexive:</span>
              <div className="percentages detail">
                <span>{(preferences.active * 100).toFixed(0)}%</span>
                <span>{(preferences.reflexive * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                  <div className="progress-line red" 
                        style={{ width: `${preferences.active * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.reflexive * 100}%` }}>
                  </div>
              </div>
            </div>

            <div class="bar">
              <span>Sensing / Intuitive:</span>
              <div className="percentages detail">
                <span>{(preferences.sensing * 100).toFixed(0)}%</span>
                <span>{(preferences.intuitive * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                  <div className="progress-line red" 
                        style={{ width: `${preferences.sensing * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.intuitive * 100}%` }}>
                  </div>
              </div>
            </div>

            <div class="bar">
              <span>Visual / Verbal:</span>
              <div className="percentages detail">
                <span>{(preferences.visual * 100).toFixed(0)}%</span>
                <span>{(preferences.verbal * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                  <div className="progress-line red" 
                        style={{ width: `${preferences.visual * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.verbal * 100}%` }}>
                  </div>
              </div>
            </div>

            <div class="bar">
              <span>Sequential / Global:</span>
              <div className="percentages detail">
                <span>{(preferences.sequential * 100).toFixed(0)}%</span>
                <span>{(preferences.global * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                  <div className="progress-line red" 
                        style={{ width: `${preferences.sequential * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.global * 100}%` }}>
                  </div>
              </div>
            </div>

            <span className="button-link">
              <Link to="/profile-quiz">
                <button>
                Retake learning preferences test
                </button> 
              </Link> 
            </span> 
        </div>
      </main>
    </>
  );
}

export default Profile;