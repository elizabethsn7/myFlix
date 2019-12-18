import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://liz-flix.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no_such_user');
      });
  };

  return (
    <div>
      <Jumbotron className='jumbo'>
        <h1>Welcome to myFlix!</h1>
        <p className='loginView'>
          This is a simple single page app using React
        </p>
      </Jumbotron>
      <Container>
        <Form>
          <Form.Row>
            <Form.Group controlId='formBasicUsername' as={Col}>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword' as={Col}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Button variant='danger' type='button' onClick={handleSubmit}>
            Submit
          </Button>
          <Link to={`/register`}>
            <Button variant='secondary'>Register</Button>
          </Link>
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
