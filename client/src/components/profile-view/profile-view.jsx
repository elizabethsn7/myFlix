import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
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
          userInfo: response.data,
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.FavoriteMovies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { username, email, birthday, favorites } = this.state;

    return (
      <Card className="profile-view" style={{ width: "32rem" }}>
        <Card.Body>
          <Card.Title className="profile-title">Profile</Card.Title>
          <ListGroup className="user-name">
            <ListGroup.Item>Username: {username}</ListGroup.Item>
            <ListGroup.Item>E-Mail: {email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {birthday}</ListGroup.Item>
            <ListGroup.Item>
              Favorites:
              <div>
                {favorites.length === 0 && (
                  <div className="value">No favorites added</div>
                )}{" "}
                {favorites.length > 0 && (
                  <ul>
                    {favorites.map(favoriteMovie => (
                      <li key={favoriteMovie}>
                        <p className="favorites">
                          {
                            JSON.parse(localStorage.getItem("movies")).find(
                              movie => movie.id === favoriteMovie
                            ).Title
                          }
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
}
