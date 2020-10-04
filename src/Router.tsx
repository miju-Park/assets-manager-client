import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Routes/Home';
import KRStock from './Routes/Setting/KRStock';
import USDStock from './Routes/Setting/USDStock';

export default () => (
  <Router>
    <>
      <Sidebar />
      <Route path="/" exact component={Home} />
      <Route path="/setting/krstock" component={KRStock} />
      <Route path="/setting/usdstock" component={USDStock} />
    </>
  </Router>
);
