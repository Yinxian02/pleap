import React, { Component } from 'react';
import "../styles/Lesson.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

class Lesson extends Component {
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
      // console.log(res.data);
      this.setState({ learningObjects: res.data });
    } catch (error) {
      console.error('Error fetching learning objects:', error);
    }
  }

  render() {
    const { title, author } = this.props.lesson;
    const { learningObjects } = this.state;
    console.log(learningObjects)

    return (
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>
          <ul>
            {learningObjects.map(lo => (
              <li key={lo._id}>
                <h4>{lo.title}</h4>
                <p>{lo.content?.text}</p>
                <p>{lo.content?.link}</p>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  }
}

export default class Lessons extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = { lessons: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5001/lessons/', {
        headers: {
          Authorization: 'Bearer ' + this.context.auth.accessToken,
        },
      })
      .then(res => {
        console.log(res.data)
        this.setState({ lessons: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  lessonsList() {
    return this.state.lessons.map(currentlesson => (
      <Lesson lesson={currentlesson} key={currentlesson._id} />
    ));
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/create-lesson">
            <p>Add lessons to database</p>
          </Link>
        </div>
        <h3>Lessons</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Learning Objects</th>
            </tr>
          </thead>
          <tbody>{this.lessonsList()}</tbody>
        </table>
      </div>
    );
  }
}
