import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = e => {
    e.preventDefault;
    /* Send a request to the server to register */

    axios
      .post("https://liz-flix.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log("error_in_registering_user");
      });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Sign in Below</h3>
          </Col>
        </Row>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBasicBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthday"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="danger" type="button" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}
