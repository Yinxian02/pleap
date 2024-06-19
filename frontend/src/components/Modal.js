import React, { useState } from 'react';
import Difficulty from './Difficulty.component';
import { Link } from 'react-router-dom';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, children, lesson }) => {
  // const [answer, setAnswer] = useState('');
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  const handleSubmit = () => {
    // onQuestionSubmit(answer);
    // setAnswer()
    setIsQuestionAnswered(true);
    console.log('Learner level:', difficulty);  
  };

  if (!isOpen) {
    // setIsQuestionAnswered(false);
    return null;
  }

  const handleLevelChange = (level) => {
    setDifficulty(level);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">X</button>
        {!isQuestionAnswered ? (
          <div>
            <p> How much do you know about `{lesson.title}'</p>
            <Difficulty className="difficulty-bar" onLevelChange={handleLevelChange}/>
            <Link to={"/lesson/" + lesson._id}>
              <button className="difficulty-button" onClick={handleSubmit}>Submit</button>
            </Link>
          </div>
        ) : (
          <div>{children} </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
