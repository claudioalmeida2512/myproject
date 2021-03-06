import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';
import FormLogin from '../views/base/FormLogin' ;
import ListDocs from '../views/cadastros/ListDocs' ;
import TopBar from '../views/base/TopBar';

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
      <Route exact path='/' component={() => <TopBar /> } />
      <PrivateRoute exact path='/docs' component={() => <ListDocs /> } />
    </Switch>
  </BrowserRouter>
);

export default Routes;