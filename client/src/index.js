import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "ract-router-dom"

ReactDOM.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

