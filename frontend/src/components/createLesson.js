import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
  
const LearningObjectsComponent = ({ learningObjects }) => {
  const [lesson, setLesson] = useState({
    title: "Intro to programming",
    author: "Josiah Wang",
    _learningObjects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  const createLearningObjects = async (learningObjects) => {
    try {
      const res = await axios.post('http://localhost:5001/learning-objects/addBatch', 
        { learningObjects },
        {
          headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
            mode: 'cors',
            withCredentials: true,
          },
        }
      );

      console.log(`Learning objects added: ${res.data.ids}`);
      return res.data.ids;
    } catch (error) {
      console.error('Error adding learning objects:', error);
      throw error; // Re-throw the error to handle it outside the function if needed
    }
  };

  const addLesson = async (lesson) => {
    try {
      const res = await axios.post(
        'http://localhost:5001/lessons/add',
        JSON.stringify({lesson: lesson}),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
            mode: 'cors',
            withCredentials: true,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  useEffect(() => {
    const fetchAndAddLearningObjects = async () => {
      try {
        const ids = await createLearningObjects(learningObjects);
        const updatedLesson = {
          ...lesson,
          _learningObjects: [...lesson._learningObjects, ...ids]
        };
        await addLesson(updatedLesson);
        setLesson(updatedLesson); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAddLearningObjects();
  }, [learningObjects]); // This will run the effect when learningObjects changes

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>Author: {lesson.author}</p>
      <div>
        <h3>Topics</h3>
        <ul>
          {lesson._learningObjects.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningObjectsComponent;
