import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Login from './views/login/login';
import Index from './views/index/index';
import {BrowserRouter,Route,Switch, Redirect} from 'react-router-dom';
import PrivateRouter from './views/components/privateRouter'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <PrivateRouter path="/index" component={Index}></PrivateRouter>
      {/* <Redirect to="/login"></Redirect> */}
    </Switch>
    </BrowserRouter>
  );
}

export default App;
