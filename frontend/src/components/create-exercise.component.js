import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'

export default function CreateExercise() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const { auth } = useContext(AuthContext);

  const validateYT = (value) => {
    
    if (validator.isURL(value)) {
      setYTErrorMessage('')
    } else {
      setYTErrorMessage('Invalid URL')
    }
  }

  const [ytErrorMessage, setYTErrorMessage] = useState('')
  const [exercise, setExercise] = useState({
    title: '',
    creator: '',
    age: '',
    number: 0,
    durationHours: 0,
    durationMins: 0,
    materials: '',
    instructions: '',
    youtube: '',
    picture: '',
  });

  const onChangeTitle = (e) => {
      setExercise({...exercise, 
        title: e.target.value
      })
    }
      
  const onChangeCreator = (e) =>{
      setExercise({...exercise, 
        creator: e.target.value
      })
  }
      
  const onChangeAge = (e) =>{
    setExercise({...exercise, 
      age: e.target.value
    })
  }
    
  const onChangeNumber = (e) =>{
    setExercise({...exercise, 
      number: e.target.value
    })
  }
    
  const onChangeDurationHours = (e) =>{
    setExercise({...exercise,
      durationHours: e.target.value
    })
  }
    
  const onChangeDurationMins = (e) =>{
    setExercise({...exercise,
      durationMins: e.target.value
    })
  }
    
  const onChangeMaterials = (e) =>{
    setExercise({...exercise,
      materials: e.target.value
    })
  }
    
  const onChangeInstructions = (e) =>{
    setExercise({...exercise,
      instructions: e.target.value
    })
  }
    
  const onChangeYoutube = (e) =>{
    validateYT(e.target.value); 
    setExercise({...exercise,
      youtube: e.target.value
    })
  }
    
  const onChangePicture = (e) =>{
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
          console.log(fileReader.result)
          setExercise({...exercise,
            picture: fileReader.result,
          })
        };
        fileReader.onerror = (error) => {
          console.log(error)
        }
      }

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:5001/exercises/add',
        JSON.stringify({ exercise }),
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
        navigate('/admin/exercises-list', { replace: true });
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };


  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
         <div className="form-group"> 
          <label>Title: </label>
          <input type="text"
              required
              className="form-control"
              value={exercise.title}
              onChange={onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Creator: </label>
          <input type="text"
              required
              className="form-control"
              value={exercise.creator}
              onChange={onChangeCreator}
              />
        </div>
        <div className="form-group"> 
          <label>Age: </label>
          <input type="text"
              required
              className="form-control"
              value={exercise.age}
              onChange={onChangeAge}
              />
        </div>
        <div className="form-group">
          <label>Number of students: </label>
          <input 
              type="text" 
              className="form-control"
              value={exercise.number}
              onChange={onChangeNumber}
              />
        </div>
        <div className="form-group">
          <label>Hours: </label>
          <input 
              type="text" 
              className="form-control"
              value={exercise.durationHours}
              onChange={onChangeDurationHours}
              />
        </div>
        <div className="form-group">
          <label>Minutes: </label>
          <input 
              type="text" 
              className="form-control"
              value={exercise.durationMins}
              onChange={onChangeDurationMins}
              />
        </div>

        <div className="form-group">
          <label>Materials: </label>
          <input 
              type="text" 
              className="form-control"
              value={exercise.materials}
              onChange={onChangeMaterials}
              />
        </div>

        <div className="form-group">
          <label>Instructions: </label>
          <input 
              type="text" 
              className="form-control"
              value={exercise.instructions}
              onChange={onChangeInstructions}
              />
        </div>

        
        <div className="form-group">
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
        </div>



        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}