import React, { Component } from 'react'
import '../styles/Profile.css'
import { NavLink, Link } from "react-router-dom"
import axios from 'axios';

import AuthContext from "../context/AuthContext";

const User = props => (
  <tr>
    <td>{props.profile.name}</td>
    <td>{props.profile.email}</td>
    <td>{props.profile.preferences}</td>
  </tr>
)

export default class Profile extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {profile: []};
  }

  componentDidMount() {
      axios.get('http://localhost:5001/user/', {
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


  render() {
    return (
      <div>
        <h3>Profile</h3>
        <nav> 
          <NavLink to='profile-quiz'>Figure out your preference!</NavLink>  
        </nav>
      </div>
    )
  }
}