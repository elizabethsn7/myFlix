import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

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

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        userInfo: localStorage.getItem("user")
      });
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://liz-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          username: response.data.username,
          password: response.data.uassword,
          email: response.data.email,
          birthday: response.data.birthday,
          favorites: response.data.favorites
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { username, password, email, birthday, favorites } = this.state;
    return (
      <Container>
        <Row>
          <ListGroup as={Col}>
            <ListGroup.Item>Username:{username}</ListGroup.Item>
            <ListGroup.Item>Password:{password}</ListGroup.Item>
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {birthday}</ListGroup.Item>
            <ListGroup.Item>Favorites: {favorites}</ListGroup.Item>
          </ListGroup>
          <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}
