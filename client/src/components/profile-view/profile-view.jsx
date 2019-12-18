import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userInfo: null,
      favorites: []
    };
  }
  getUser(token) {
    axios
      .get('https://liz-flix.herokuapp.com/users/:Username', {
        headers: { Authorization: 'Bearer ${token}' }
      })
      .then(response => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.Favorites
        });
      })
      .catch(function(error) {
        console.log(error + 'from_getUser_token');
      });
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        userInfo: localStorage.getItem('user')
      });
      this.getUser(accessToken);
    }
  }
  render() {
    const { username, password, email, birthday, favorites } = this.state;
    return (
      <ListGroup>
        <ListGroup.Item>UserName: </ListGroup.Item>
        <ListGroup.Item>Password: </ListGroup.Item>
        <ListGroup.Item>Email: </ListGroup.Item>
        <ListGroup.Item>Birthday:</ListGroup.Item>
        <ListGroup.Item>Favorites: </ListGroup.Item>
      </ListGroup>
    );
  }
}
