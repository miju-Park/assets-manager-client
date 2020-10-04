import React from 'react';
import Globalstyle from './GlobalStyles';
import Router from './Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router />
      <Globalstyle />
    </RecoilRoot>
  );
}

export default App;
