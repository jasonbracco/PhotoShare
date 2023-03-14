class OrdersController < ApplicationController

    def create
        order=Order.create!(order_params)
        render json: order
    end

    def index
        orders=Order.all 
        render json: orders 
    end

    def show
        order=Order.where(user_id: params[:user_id]).all
        render json: order
    end        

    private

    def order_params
        params.permit(:user_id, :photograph_id)
    end
end
