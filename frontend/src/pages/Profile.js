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
        <h2 className="profile-title">Your Profile</h2>
        <div className="profile-container">

          <div className="email-and-name">
            <h3>Email:</h3>
            <span className="detail">{email}</span>
            <br/>
            <h3>Name:</h3>
            <span className="detail">{name}</span>
            <br/>
          </div>

          <div className="preferences-container">
            <h2 className="preferences-title">Your Learning Preferences:</h2>
            {/* <br/> */}
            <div className="bar">
              <div className="percentages detail">
                <span>{(preferences.active * 100).toFixed(0)}%</span>
                <span>{(preferences.reflexive * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                <span className="dimension-left">Active</span>
                  <div className="progress-line red"
                        style={{ width: `${preferences.active * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.reflexive * 100}%` }}>
                  </div>
                <span className="dimension-right">Reflexive</span>
              </div>
            </div>

            <div class="bar">
              <div className="percentages detail">
                <span>{(preferences.sensing * 100).toFixed(0)}%</span>
                <span>{(preferences.intuitive * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                <span className="dimension-left">Sensing</span>
                  <div className="progress-line red" 
                        style={{ width: `${preferences.sensing * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.intuitive * 100}%` }}>
                  </div>
                <span className="dimension-right">Intuitive</span>
              </div>
            </div>

            <div class="bar">
              <div className="percentages detail">
                <span>{(preferences.visual * 100).toFixed(0)}%</span>
                <span>{(preferences.verbal * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                <span className="dimension-left">Visual</span>
                  <div className="progress-line red" 
                        style={{ width: `${preferences.visual * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.verbal * 100}%` }}>
                  </div>
                <span className="dimension-right">Verbal</span>
              </div>
            </div>

            <div class="bar">
              <div className="percentages detail">
                <span>{(preferences.sequential * 100).toFixed(0)}%</span>
                <span>{(preferences.global * 100).toFixed(0)}%</span>
              </div>
              <div className="progress-line-container">
                <span className="dimension-left">Sequential</span>
                  <div className="progress-line red" 
                        style={{ width: `${preferences.sequential * 100}%` }}>
                  </div>
                  <div className="progress-line green" 
                        style={{ width: `${preferences.global * 100}%` }}>
                  </div>
                <span className="dimension-right">Global</span>
              </div>
            </div>

            <span className="button-link">
              <Link to="/profile-quiz">
                <button>
                Retake Quiz
                </button> 
              </Link> 
            </span> 

          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;