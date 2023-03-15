import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom" 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//A <BrowserRouter> stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

const stripePromise = loadStripe('pk_test_51MlN72DgP7j3zPpjEKOaX8EvGb4aOoJcU9e4mY5Phet4oThOYUVhPPX7rPWlx8NBPSyZ3uRtptzhc0168IOa86yD002XjxKbAF');

ReactDOM.render(
  <BrowserRouter> 
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>,
  document.getElementById("root")
);

