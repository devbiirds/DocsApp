import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import { parseJwt } from './services/parseJwt.js';

function App() {
  let token = localStorage.getItem('token');
  if (token && !parseJwt(token)) {
    localStorage.clear();
  }
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
