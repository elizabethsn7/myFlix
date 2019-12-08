import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Send a request to the server for authentification
    props.onLoggedIn(username);
  };
  return (
    <div>
      <Navbar bg="danger">
        <Navbar.Brand className="brand">myFlix</Navbar.Brand>
      </Navbar>

      <Jumbotron className="jumbo">
        <h1>Welcome to myFlix!</h1>
        <p class="loginView">This is a simple single page app using React</p>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <h3>Sign in Below or click here to Register</h3>
          </Col>
        </Row>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="danger" type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
{
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
