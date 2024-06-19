import React, { Component, useContext, useState, useEffect } from 'react';
import "../styles/Lesson.css";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import displayLO from '../components/displayLO';

// import { contentBasedFiltering } from '../components/contentBasedFiltering';
// import { collaborativeFiltering } from '../components/collaborativeFiltering';
import { hybridFiltering } from '../components/hybridFiltering';
import { sortLOs } from '../components/sortLOs';

import { MdLightbulbOutline } from "react-icons/md";

const LessonFetch = ({lesson, difficulty}) => {
  const { auth } = useContext(AuthContext);
  const [learningObjects, setLearningObjects] = useState([]);
  const [filteredLearningObjects, setFilteredLearningObjects] = useState([]);

  const filterByDifficulty = (learningObjects) => {
    return learningObjects.filter(lo => lo.educational.difficulty === difficulty || lo.educational.difficulty === '');
  }

  useEffect(() => {
    const fetchLearningObjects = async (ids) => {
      try {
        const res = await axios.post(
          'http://localhost:5001/learning-objects/batch',
          { ids },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log((res.data).map(lo => lo._id));
        const loByDifficulty = filterByDifficulty(res.data);
        console.log("filtered by difficulty:", loByDifficulty);
        setLearningObjects(loByDifficulty);
      } catch (error) {
        console.error('Error fetching learning objects:', error);
      }
    };

    if (lesson._learningObjects) {
      fetchLearningObjects(lesson._learningObjects);
    }
  }, [lesson, auth.accessToken]);

  useEffect(() => {
    if (learningObjects.length > 0) {
      const fetchFilteredLearningObjects = async () => {
        try {
          // const filteredObjects = await contentBasedFiltering(learningObjects, auth.id, auth.preferences, auth.accessToken);
          // const filteredObjects = await collaborativeFiltering(learningObjects, auth.id, auth.preferences, auth.accessToken);
          const filteredObjects = await hybridFiltering(learningObjects, auth.id, auth.preferences, auth.accessToken, 0.5);
          const sortedObjects = sortLOs(filteredObjects, auth.preferences);
          setFilteredLearningObjects(sortedObjects);
          console.log(filteredObjects);
        } catch (error) {
          console.error('Error fetching filtered learning objects:', error);
        }
      };

      fetchFilteredLearningObjects();
    }
  }, [learningObjects, auth.id, auth.preferences, auth.accessToken]);
  
    return <div>
            <div className='lesson-header'>
              <p className="lesson-title">{lesson.title}</p>
              <p className="lesson-author">{lesson.author}</p>
              <p className="lesson-description">{lesson.description}</p>
            </div>
            
              <div className="ai-disclaimer">
                <MdLightbulbOutline className="lightbulb"/>
                <p className='ai-disclaimer-text'>Some content generated on this platform is powered by AI. Always consult a qualified expert for specific guidance.</p>
              </div>

              <div className='learning-objects-divs-container'>
                {filteredLearningObjects.map((lo, index) => (
                    <p key={lo.id || index} className='learning-object-div'>{displayLO(lo)}</p>
                  ))} 
                {/* {learningObjects.map((lo, index) => (
                    <p key={lo.id || index} className='learning-object-div'>{displayLO(lo)}</p>
                  ))} */}
              </div>
            </div>
    
  }


const Lesson = () => {
  const { id, difficulty } = useParams();
  const { auth } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null); 

  useEffect(() => {
    axios
      .get(`http://localhost:5001/lessons/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.accessToken,
        },
      })
      .then(res => {
        setLesson(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id, auth.accessToken]);

  const getDifficulty = (level) => {
    if (level === '1') {
      return "very easy";
    } else if (level === '2') {
      return "easy";
    } else if (level === '3') {
      return "medium";
    } else if (level === '4') {
      return "hard";
    } else if (level === '5') {
      return "very hard";
    }
  }; 

  const lessonDisplay = () => {
    if (lesson !== null) {
      const difficultyLevel = getDifficulty(difficulty);
      return <LessonFetch lesson={lesson} difficulty={difficultyLevel}/>;
    }
    // You might want to return a loading indicator or handle the case where lesson is still loading
    return <div>Loading...</div>;
  };

  return <div>{lessonDisplay()}</div>;
};

// Functional wrapper component to use hooks
const LessonWrapper = (props) => {
  const { id } = useParams();
  // console.log(id)
  return <Lesson {...props} id={id} />;
};

export default LessonWrapper;

  