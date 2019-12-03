import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';
import FormLogin from '../views/base/FormLogin' ;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} 
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
    ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    } />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={() => <h1>Hello World</h1>} />
      <PrivateRoute exact path='/login' component={() => <FormLogin/> } />
    </Switch>
  </BrowserRouter>
);

export default Routes;