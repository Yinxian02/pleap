import React, { Component } from 'react';
import "../styles/Lessons.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

class Lesson extends Component {
  static contextType = AuthContext;

  render() {
    const { title, author, description, thumbnail, _id } = this.props.lesson;

    return (
      // <div className="lesson-div-container">
        <Link className="lesson-link-div" to={"/lesson/" + _id}>
          <div>
            <img
              src={ thumbnail }
              alt="Slide"
              style={{ width: '300px', maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div>
            <h2 className='lesson-title'>{title}</h2>
            <h3 className='lesson-author'>{author}</h3>
            <p>{description}</p>
          </div>
        </Link>
      // </div>
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
        <Link to="/create-lesson">
          <p>add lessons to database</p>
        </Link>
        <div>
            <div className="lessons-list">
              {this.lessonsList()}
            </div>
        </div>
      </div>
    );
  }
}
