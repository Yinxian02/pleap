import React, { Component } from 'react';
import "../styles/Lesson.css";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useParams } from 'react-router-dom';

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
    const { title, author } = this.props.lesson;
    const { learningObjects } = this.state;
    console.log(learningObjects);

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

class Lesson extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { lesson: {} };
  }

  componentDidMount() {
    const { id } = this.props; // Get the lesson ID from props

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
    return <LessonFetch lesson={this.state.lesson} key={this.state.lesson._id} />;
  }

  render() {
    return (
      <div>
        <h3>Lesson</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Learning Objects</th>
            </tr>
          </thead>
          <tbody>{this.lessonDisplay()}</tbody>
        </table>
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

  