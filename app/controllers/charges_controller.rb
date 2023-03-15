require "stripe"

class ChargesController < ApplicationController
    def create
        # Set your Stripe API secret key
        Stripe.api_key = 'sk_test_51MlN72DgP7j3zPpjEKOaX8EvGb4aOoJcU9e4mY5Phet4oThOYUVhPPX7rPWlx8NBPSyZ3uRtptzhc0168IOa86yD002XjxKbAF'
    
        # Get the order information from the request
        order = JSON.parse(request.body.read)
    
        # Calculate the order amount
        amount = calculate_order_amount(order['items'])
    
        # Create a PaymentIntent with the calculated amount
        payment_intent = Stripe::PaymentIntent.create(
          amount: amount,
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true
          }
        )
    
        # Send the client secret back to the client
        render json: { client_secret: payment_intent.client_secret }
      end
    
      private
    
      # Calculate the order amount based on the items in the order
      def calculate_order_amount(items)
        # Replace this constant with a calculation of the order's amount
        # Calculate the order total on the server to prevent
        # people from directly manipulating the amount on the client
        1400
      end
end
