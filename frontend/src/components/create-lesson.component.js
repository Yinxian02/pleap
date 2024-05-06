import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
// import validator from 'validator'
import "../styles/Lesson.css";

export default function CreateLesson() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const { auth } = useContext(AuthContext);

  // const validateYT = (value) => {
    
  //   if (validator.isURL(value)) {
  //     setYTErrorMessage('')
  //   } else {
  //     setYTErrorMessage('Invalid URL')
  //   }
  // }

  // const [ytErrorMessage, setYTErrorMessage] = useState('')

  const [title, setTitle] = useState('');
  const [lessonObjectivesList, setLessonObjectives] = useState([{lessonObjective: ""}])

  const [lesson, setLesson] = useState({
        title: useState(''),
        author: '',
        lessonObjectives: useState([{}])
  })

  const onChangeTitle = (e) => {
      setTitle(e.target.value)
    }
  
  const onChangeLessonObjectives = (e, index) => {
    const { name, value } = e.target;
    const list = [...lessonObjectivesList];
    list[index][name] = value;
    setLessonObjectives(list);
  }; 

  const addLessonObjective = () => {
    setLessonObjectives([...lessonObjectivesList, { lessonObjective: "" }]);
  };

  const deleteLessonObjective = (index) => {
    const list = [...lessonObjectivesList];
    list.splice(index, 1);
    setLessonObjectives(list);
  };


  // const onChangeYoutube = (e) =>{
  //   validateYT(e.target.value); 
  //   setExercise({...exercise,
  //     youtube: e.target.value
  //   })
  // }
    
  // const onChangePicture = (e) =>{
  //       var fileReader = new FileReader();
  //       fileReader.readAsDataURL(e.target.files[0]);
  //       fileReader.onload = () => {
  //         console.log(fileReader.result)
  //         setExercise({...exercise,
  //           picture: fileReader.result,
  //         })
  //       };
  //       fileReader.onerror = (error) => {
  //         console.log(error)
  //       }
  //     }

  const onSubmit = (e) => {
    e.preventDefault();



    axios
      .post(
        'http://localhost:5001/lessons/add',
        JSON.stringify({ lesson }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // Redirect to the "/admin" route after a successful submission
        navigate('/lessons/lessons-list', { replace: true });
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };


  return (
    <div className="create-lesson-container">
      {/* <h3>Create New Exercise Log</h3> */}
      <form onSubmit={onSubmit}>
         <div className="form-group"> 
          <label className="input-label">Lesson Title: </label>
          <br/>
          <input type="text"
              required
              className="input-field  transparent-input"
              value={title}
              onChange={onChangeTitle}
              />
        </div>

        <br/>

        <div className="form-group"> 
          <label className="input-label">Author: </label>
          <p className="input-field  transparent-input detail">{auth.email}</p>
        </div>

        <br/>

        <div className="form-group"> 
        <label className="input-label objectives-label">
            <p>Lesson Objectives: </p>
            <button type="button" onClick={addLessonObjective} className="add-btn"> 
              <IoAddOutline />
            </button>
        </label>


          {lessonObjectivesList.map((singleLessonObjective, index) => (
          <div key={index} className="objectives">
            <div className="lesson-row">
              <input
                name="lessonObjective"
                type="text"
                id={`service-${index}`} // Use a unique ID for each input field
                value={singleLessonObjective.lessonObjective}
                onChange={(e) => onChangeLessonObjectives(e, index)}
                className="input-field transparent-input"
              />
              {/* {lessonObjectivesList.length !== 1 && ( */}
                <button
                  type="button"
                  onClick={() => deleteLessonObjective(index)}
                  className="remove-btn"
                >
                  <AiIcons.AiOutlineClose />
                </button>
              {/* )} */}
            </div>
            {/* {lessonObjectivesList.length - 1 === index && lessonObjectivesList.length < 4 && (
              
            )} */}
          </div>
        ))}

        </div>
        
  
        {/* /* <div className="form-group">
          <label>Youtube: </label>
          <input 
              type="text" 
              className="form-control"
              value={exercise.youtube}
              onChange={onChangeYoutube}
              />
              <span style={{
              fontWeight: 'bold',
              color: 'red',
              }}>{ytErrorMessage}</span>
        </div>

        <div className="form-group">
          <label>Picture: </label>
          <input 
              type="file" 
              accept=".jpeg, .png, .jpg"
              className="form-control"
              // value={this.state.picture}
              onChange={onChangePicture}
              />
        </div> */ }


        <button>Create Lesson</button>
      </form>
    </div>
  );
}