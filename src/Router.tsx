import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Routes/Home';

export default () => (
  <Router>
    <>
      <Sidebar />
      <Route path="/" exact component={Home} />
    </>
  </Router>
);
