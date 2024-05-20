import React, { Component } from 'react';
import "../styles/Lesson.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

class Lesson extends Component {
  static contextType = AuthContext;

  render() {
    const { title, author } = this.props.lesson;

    return (
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>
          <Link to={"/lesson/"+this.props.lesson._id}>lesson</Link>
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
            </tr>
          </thead>
          <tbody>{this.lessonsList()}</tbody>
        </table>
      </div>
    );
  }
}
