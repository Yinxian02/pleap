import React, { Component } from 'react';
import "../styles/Lessons.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

class Lesson extends Component {
  static contextType = AuthContext;

  render() {
    const { title, description, thumbnail, _id } = this.props.lesson;

    return (
      <Link className="lessons-link-div" to={"/lesson/" + _id}>
        <div className="lessons-content">
          <div className="lessons-title-container">
            <div className="lessons-title">{title.split(' ')[0]}</div>
            <div className="lessons-subtitle">{title.split(' ').slice(1).join(' ')}</div>
          </div>
          <img className="lessons-thumbnail" src={thumbnail} alt="Slide" />
          <div className="lessons-description">{description}</div>
        </div>
      </Link>
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
      <div className="lessons-list">
        {this.lessonsList()}
      </div>
    );
  }
}
