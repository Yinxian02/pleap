import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import DatePicker from 'react-datepicker'; // Make sure you have this import
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'

function EditExercise() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const validateYT = (value) => {
    
    if (validator.isURL(value)) {
      setYTErrorMessage('')
    } else {
      setYTErrorMessage('Invalid URL')
    }
  }

  const { id } = useParams();

  const [ytErrorMessage, setYTErrorMessage] = useState('')
  const [exercise, setExercise] = useState({
    title: '',
    creator: '',
    age: '',
    number: 0,
    durationHours: 0,
    durationMins: 0,
    materials: [],
    instructions: [],
    youtube:'',
    picture: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5001/exercises/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setExercise({
          title: data.title,
          creator: data.creator,
          age: data.age,
          number: data.number,
          durationHours: data.durationHours,
          durationMins: data.durationMins,
          materials: data.materials,
          instructions: data.instructions,
          youtube: data.youtube,
          picture: data.picture,
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);



  const onChangeTitle = (e) => {
    setExercise({...exercise, 
      title: e.target.value
    })
  };

  const onChangeCreator = (e) => {
    setExercise({...exercise, 
      creator: e.target.value
    })
  }

  const onChangeAge = (e) => {
    setExercise({...exercise, 
      age: e.target.value
    })
  }

  const onChangeNumber = (e) => {
    setExercise({...exercise, 
      number: e.target.value
    })
  }

  const onChangeDurationHours = (e) => {
    setExercise({...exercise, 
      durationHours: e.target.value
    })  
  }

  const onChangeDurationMins = (e) => {
    setExercise({...exercise, 
      durationMins: e.target.value
    })
  }

  const onChangeMaterials = (e) => {
    setExercise({...exercise, 
      materials: e.target.value
    })
  }

  const onChangeInstructions = (e) => {
    setExercise({...exercise,
      instructions: e.target.value
    })
  }

  const onChangeYoutube = (e) => {
    validateYT(e.target.value); 
    setExercise({...exercise,
      youtube: e.target.value
    })
  }

  const onChangePicture = (e) => {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      console.log(fileReader.result)
      setExercise({ ...exercise, picture: fileReader.result });
    };
    fileReader.onerror = (error) => {
      console.log(error)
    }
  };
 

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedExercise = {
      title: exercise.title,
      creator: exercise.creator,
      age: exercise.age,
      number: exercise.number,
      durationHours: exercise.durationHours,
      durationMins: exercise.durationMins,
      materials: exercise.materials,
      instructions: exercise.instructions,
      youtube: exercise.youtube,
      picture: exercise.picture,
    };

    console.log(updatedExercise);

    axios
      .post(
        `http://localhost:5001/exercises/update/${id}`, 
        updatedExercise,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken,
          },
        })
      .then((res) => {
        console.log(res.data)
        navigate('/admin/exercises-list', { replace: true });
      }).catch((error) => {
        // Handle errors here
        console.error(error);
      });

  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
              // value={exercise.picture}
              onChange={onChangePicture}
              />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
