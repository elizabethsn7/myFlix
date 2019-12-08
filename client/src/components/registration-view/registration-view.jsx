import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Send a request to the server for authentification
    props.onRegistered(username);
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="text"
            name="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
RegistrationView.propTypes = {
  handleSubmit: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired
  })
};
