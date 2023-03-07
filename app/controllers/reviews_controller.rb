class ReviewsController < ApplicationController

    def create
        review=Review.create!(review_params)
        render json: review
    end

    def index
        reviews=Review.all 
        render json: reviews
    end

    private

    def review_params
        params.permit(:content, :user_id, :photograph_id)
    end
end
