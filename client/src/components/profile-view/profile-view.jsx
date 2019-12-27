import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { MainView } from "../main-view/main-view";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Favorites: []
    };
  }

  render() {
    const { username, email, birthday, favorites } = this.state;

    return (
      <Card className="profile-view" style={{ width: "32rem" }}>
        <Card.Body>
          <Card.Title className="profile-title">Profile</Card.Title>
          <ListGroup className="user-name">
            <ListGroup.Item>
              username: <span className="user-value">{username}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              E-Mail: <span className="user-value">{email}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              birthday: <span className="user-value">{birthday}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              favorites: <span className="user-value">{favorites}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <div>
          <Link to={`/`}>
            <Button className="danger">Back to Movies</Button>
          </Link>
        </div>
      </Card>
    );
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
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
          userData: response.data,
          username: response.data.username,
          email: response.data.email,
          birthday: response.data.birthday,
          favorites: response.data.favorites
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
