import "../styles/Lessons.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import Modal from '../components/Modal'; 
import React, { useContext, useState, useEffect } from 'react';;

const Lesson = ({ lesson, onClick }) => {
  const { title, description, thumbnail, _id } = lesson;

  return (
    <div className="lessons-link-div">
      <div className="lessons-content" onClick={() => onClick(lesson)}>
        <div className="lessons-title-container">
          <div className="lessons-title">{title.split(' ')[0]}</div>
          <div className="lessons-subtitle">{title.split(' ').slice(1).join(' ')}</div>
        </div>
        <img className="lessons-thumbnail" src={thumbnail} alt="Slide" />
        <div className="lessons-description">{description}</div>
      </div>
    </div>
    // <Link className="lessons-link-div" to={"/lesson/" + _id}>
    // </Link>
  );
};

const Lessons = () => {
  const { auth } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5001/lessons/', {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLessons(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth.accessToken]);

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  const handleQuestionSubmit = (answer) => {
    console.log('User answer:', answer); 
  };

  return (
    <>
      <div className="lessons-list">
        {lessons.map((currentLesson) => (
          <Lesson lesson={currentLesson} key={currentLesson._id} onClick={openModal}/>
        ))}
        {/* <button onClick={openModal}>Open Modal</button> */}
        <Modal isOpen={isModalOpen} 
              onClose={closeModal}
              lesson={selectedLesson}
              />
      </div>
      <div className="lessons-footer">
        <Link to={"/upload-lesson"}>
          <button>+</button>
        </Link>
      </div>
    </>
    );
};

export default Lessons;