import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = e => {
    e.preventDefault();
    axios
      .post('https://liz-flix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  return (
    <Container>
      <Form>
        {/* <Form.Group controlId='formFirstName'>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type='text'
            name='firstname'
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
          />
        </Form.Group> */}
        {/* <Form.Group controlId='formLastName'>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type='text'
            name='lastname'
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBirthday'>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type='date'
            name='birthday'
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button variant='danger' type='submit' onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Container>
  );
}
