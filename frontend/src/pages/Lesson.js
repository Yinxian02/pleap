import React, { Component, useContext, useState, useEffect } from 'react';
import "../styles/Lesson.css";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { displayLO } from '../components/displayLO';
import { contentBasedFiltering } from '../components/contentBasedFiltering';

const LessonFetch = ({lesson}) => {
  const { auth } = useContext(AuthContext);
  const [learningObjects, setLearningObjects] = useState([]);
  const [filteredLearningObjects, setFilteredLearningObjects] = useState([]);

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
        console.log(res.data);
        setLearningObjects(res.data);
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
      const filteredObjects = contentBasedFiltering(learningObjects, auth.id, auth.preferences, auth.accessToken);
      setFilteredLearningObjects(filteredObjects);
    }
  }, [learningObjects, auth.id, auth.preferences, auth.accessToken]);
  
    return <div>
              <h2 className="lesson-title">{lesson.title}</h2>
              <h3 className="lesson-author">{lesson.author}</h3>
              <p className="lesson-description">{lesson.description}</p>
              <br/>

              <div>
                {/* {filteredLearningObjects.map((lo, index) => (
                    <p key={lo.id || index} className='learning-object-div'>{displayLO(lo)}</p>
                  ))} */}
              </div>
            </div>
    
  }


class Lesson extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { 
      lesson: {},
      preferences: {
        active: 0,
        reflexive: 0,
        sensing: 0,
        intuitive: 0,
        visual: 0,
        verbal: 0,
        sequential: 0,
        global: 0,
      },
     };
  }

  componentDidMount() {
    const { id } = this.props;  
    // this.fetchUserPreferences(); 

    axios
      .get(`http://localhost:5001/lessons/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.auth.accessToken,
        },
      })
      .then(res => {
        console.log(res.data);
        this.setState({ lesson: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  lessonDisplay() {
    if (this.state.lesson !== null){
      return <LessonFetch lesson={this.state.lesson}/>;
    }
  }

  render() {
    return (
      <div>
        {this.lessonDisplay()}
      </div>
    );
  }
}

// Functional wrapper component to use hooks
const LessonWrapper = (props) => {
  const { id } = useParams();
  // console.log(id)
  return <Lesson {...props} id={id} />;
};

export default LessonWrapper;

  