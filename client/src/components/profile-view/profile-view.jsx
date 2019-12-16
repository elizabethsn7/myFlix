//  User profile view to display user information and:
// Allow a user to update their user info (username, password, email, date of birth)
// Allow a user to deregister
// Display a user's favorite movies
// Allow a user to remove a movie from their list of favorites

import React from 'react';
import axios from 'axios';
import React, { useState } from 'react';

import { MainView } from '../main-view/main-view';
import { LoginView } from '../login-view/login-view';

export function ProfileVire(props) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const viewProfile = e => {
    e.preventDefault();
    axios
      .get('https://liz-flix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        props.console.log(data);
      })
      .catch(e => {
        console.log('error_in_viewing_profile');
      });
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type='text'
          name='firstname'
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='text'
          name='birthday'
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
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
    </Form>
  );
}
