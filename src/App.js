import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from './component/header/Header';
import Main from './component/Main';
import SendNetwork from './component/SendNetwork';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Main></Main>
        {/* <SendNetwork /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
