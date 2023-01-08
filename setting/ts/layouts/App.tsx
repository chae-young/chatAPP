
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import loadable from '@loadable/component';

const Login = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))

const App = () => {
  return <Switch>
    <Redirect exact path="/" to="/lohin"/>
    <Route path="/login" component={Login} />
    <Route path="/SignUp" component={SignUp} />
  </Switch>
};

export default App;
