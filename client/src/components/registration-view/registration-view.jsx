import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration-view.scss";
import { constants } from "crypto";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegister = e => {
    e.preventDefault;
    // Send a request to the server for authentification
    axios
      .post("https://liz-flix.herokuapp.com/login", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(resoonse => {
        const data = response.data;
        window.open("/", "_self");
      })
      .catch(e => {
        console.log("error_registering_user");
      });
    props.onRegistered(username);
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={e => createUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasidPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={e => createPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => createEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter birthday"
            value={birthday}
            onChange={e => createBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="danger" type="button" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Container>
  );
}
RegistrationView.propTypes = {
  handleRegister: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired
  })
};
