import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from "../context/AuthContext";

const Exercise = props => (
  <tr>
    <td>{props.exercise.title}</td>
    <td>{props.exercise.creator}</td>
    <td>{props.exercise.age}</td>
    <td>{props.exercise.number}</td>
    <td>{props.exercise.durationHours}</td>
    <td>{props.exercise.durationMins}</td>
    <td>{props.exercise.materials}</td>
    <td>{props.exercise.instructions}</td>
    <td>{props.exercise.youtube}</td>
    <td><img width="100" src={props.exercise.picture} alt="error"/></td>
    <td>
      <Link to={"/admin/edit-exercise/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
      axios.get('http://localhost:5001/exercises/', {
        headers: {
          Authorization: 'Bearer ' + this.context.auth.accessToken,
      } 
      })
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
}

  deleteExercise(id) {
    axios.delete('http://localhost:5001/exercises/'+id, {
        headers: {
          Authorization: 'Bearer ' + this.context.auth.accessToken,
      } 
    })
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Age</th>
              <th>Number</th>
              <th>Duration (Hours)</th>
              <th>Duration (Mins)</th>
              <th>Materials</th>
              <th>Instructions</th>
              <th>Youtube</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}