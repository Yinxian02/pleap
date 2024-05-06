import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from "../context/AuthContext";

const Lesson = props => (
  <tr>
    <td>{props.lesson.title}</td>
    {/* <td>{props.exercise.creator}</td>
    <td>{props.exercise.age}</td>
    <td>{props.exercise.number}</td>
    <td>{props.exercise.durationHours}</td>
    <td>{props.exercise.durationMins}</td>
    <td>{props.exercise.materials}</td>
    <td>{props.exercise.instructions}</td>
    <td>{props.exercise.youtube}</td> */}
    {/* <td><img width="100" src={props.exercise.picture} alt="error"/></td> */}
    <td>
      <Link to={"/lessons/edit-lesson/"+props.lesson._id}>edit</Link> | 
      <a href="#" onClick={() => { props.deleteLesson(props.lesson._id) }}>delete</a>
    </td>
  </tr>
)

export default class LessonsList extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.deleteLesson = this.deleteLesson.bind(this)

    this.state = {lessons: []};
  }

  componentDidMount() {
      axios.get('http://localhost:5001/lessons/', {
        headers: {
          Authorization: 'Bearer ' + this.context.auth.accessToken,
      } 
      })
      .then(response => {
        this.setState({ lessons: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
}

  deleteLesson(id) {
    axios.delete('http://localhost:5001/lessons/'+id, {
        headers: {
          Authorization: 'Bearer ' + this.context.auth.accessToken,
      } 
    })
      .then(response => { console.log(response.data)});

    this.setState({
      lessons: this.state.lessons.filter(el => el._id !== id)
    })
  }

  lessonsList() {
    return this.state.lessons.map(currentlesson => {
      return <Lesson lesson={currentlesson} deleteLesson={this.deleteLesson} key={currentlesson._id}/>;
    })
  }

  render() {
    return (
      <div>
        {/* <h3>Logged Exercises</h3> */}
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              {/* <th>Creator</th>
              <th>Age</th>
              <th>Number</th>
              <th>Duration (Hours)</th>
              <th>Duration (Mins)</th>
              <th>Materials</th>
              <th>Instructions</th>
              <th>Youtube</th>
              <th>Picture</th> */}
            </tr>
          </thead>
          <tbody>
            { this.lessonsList() }
          </tbody>
        </table>
      </div>
    )
  }
}