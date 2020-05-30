/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * post username to login
   * @function handleSubmit
   * @param {event}
   * @return {object} User info
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://liz-flix.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const { data } = response;
        props.onLoggedIn(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container>
        <h1>Welcome to myFlix!</h1>
        <p className="loginView">
          This is a simple single page app using React
        </p>

        <Form>
          <Form.Row>
            <Form.Group controlId="formBasicUsername" as={Col}>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" as={Col}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Button className="submitButton" type="button" onClick={handleSubmit}>
            Submit
          </Button>
          <Link to="/register">
            <Button className="submitButton">Register</Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
export default LoginView;
