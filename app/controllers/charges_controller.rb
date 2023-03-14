require 'stripe'

class ChargesController < ApplicationController

    def create

        Stripe.api_key = 'sk_test_51MlN72DgP7j3zPpjEKOaX8EvGb4aOoJcU9e4mY5Phet4oThOYUVhPPX7rPWlx8NBPSyZ3uRtptzhc0168IOa86yD002XjxKbAFAF'

        payment_intent = Stripe::PaymentIntent.create(
            amount: params[:amount],
            currency: params[:charge][:currency],
            automatic_payment_methods: {
            enabled: true,
        },
        receipt_email: params[:charge][:email],
        shipping: {
        name: params[:charge][:name],
        address: {
          city: params[:charge][:address][:city],
          country: params[:charge][:address][:country],
          line1: params[:charge][:address][:line1],
          line2: params[:charge][:address][:line2],
          postal_code: params[:charge][:address][:postal_code],
          state: params[:charge][:address][:state],
        },
      },
    )

    puts payment_intent
    render json: {
      clientSecret: payment_intent["client_secret"],
    }
  end

end
