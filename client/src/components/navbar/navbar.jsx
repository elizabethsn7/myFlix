import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';

export class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div className='Navbar'>
          <Navbar bg='danger' expand='lg'>
            <Navbar.Brand href='#home'>myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li>
                  <Link to='/registration'>Register</Link>
                </li>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact={true} path='/' component={LoginView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/register' component={RegistrationView} />
        </div>
      </Router>
    );
  }
}
