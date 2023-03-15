import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const StripeCard = () => {

  return (
    <div>
      <form id="payment-form">
        <label htmlFor="card-element">Card</label>
        <CardElement id="card-element" />

        <button>
          Pay $
        </button>
        </form>
    </div>
  );
};

export default StripeCard;