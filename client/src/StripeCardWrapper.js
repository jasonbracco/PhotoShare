import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCard from './StripeCard';

const stripePromise = loadStripe('pk_test_51MlN72DgP7j3zPpjEKOaX8EvGb4aOoJcU9e4mY5Phet4oThOYUVhPPX7rPWlx8NBPSyZ3uRtptzhc0168IOa86yD002XjxKbAF');

const StripeCardWrapper = props => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeCard {...props} />
      </Elements>
    </div>
  );
};

export default StripeCardWrapper;