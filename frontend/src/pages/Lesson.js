import React, { Component } from 'react';
import "../styles/Lesson.css";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { orderLearningObjects } from '../components/orderLOs';
import { displayLO } from '../components/displayLO';

class LessonFetch extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      learningObjects: [],
    };
  }

  componentDidMount() {
    this.fetchLearningObjects(this.props.lesson._learningObjects);
  }

  async fetchLearningObjects(ids) {
    try {
      const res = await axios.post(
        'http://localhost:5001/learning-objects/batch',
        { ids },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.context.auth.accessToken,
            mode: 'cors',
            withCredentials: true,
          },
        }
      );
      this.setState({ learningObjects: res.data });
    } catch (error) {
      console.error('Error fetching learning objects:', error);
    }
  }

  render() {
    // console.log("User ID: ", this.context.auth.id); 

    const { title, author, description } = this.props.lesson;
    const { learningObjects } = this.state;
    // console.log(learningObjects);

    // console.log("User preferences: ", this.context.auth.preferences)
    const learningDimensionPreferences = { f1: this.context.auth.preferences.active,
                                          f2: this.context.auth.preferences.sensing, 
                                          f3: this.context.auth.preferences.visual, 
                                          f4: this.context.auth.preferences.sequential }
  
    const sortedLOs = orderLearningObjects(learningObjects, learningDimensionPreferences);

    return (
      <div>
        <h2 className="lesson-title">{title}</h2>
        <h3 className="lesson-author">{author}</h3>
        <p className="lesson-description">{description}</p>
        <br/>

        <div>
          {sortedLOs.map(lo => (
              <p className='learning-object-div'>{displayLO(lo)}</p>
          ))}
        </div>
      </div>
    );
  }
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
      return <LessonFetch lesson={this.state.lesson} key={this.state.lesson._id} />;
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
  console.log(id)
  return <Lesson {...props} id={id} />;
};

export default LessonWrapper;

  