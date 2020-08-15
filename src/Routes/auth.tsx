import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom'
import UserLogin from '../pages/UserLogin';
import CreateUser from '../pages/CreateUser';
import SuccessCreate from '../pages/SuccessCreate';

function AuthRoutes() {
  return (
      <BrowserRouter>
        <Route path='/' exact component={UserLogin} />
        <Route path='/new-user' component={CreateUser} />
        <Route path='/success' component={SuccessCreate} />
      </BrowserRouter>
  );
}

export default AuthRoutes;