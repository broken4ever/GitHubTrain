import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Medicine } from './components/Medicine';
import { Counter } from './components/Counter';
import { AddMedicine } from './components/AddMedicine';
import { UpdateMedicine } from './components/UpdateMedicine';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Login} />
            <Route path='/counter' component={Counter} />
            <Route path='/medicine' component={Medicine} />
            <Route path='/addmedicine' component={AddMedicine} />
            <Route path='/updatemedicine/:id' component={UpdateMedicine} />
      </Layout>
    );
  }
}
