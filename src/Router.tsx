import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Routes/Home';
import KRStock from './Routes/Setting/KRStock';

export default () => (
  <Router>
    <>
      <Sidebar />
      <Route path="/" exact component={Home} />
      <Route path="/setting/krstock" component={KRStock} />
    </>
  </Router>
);
