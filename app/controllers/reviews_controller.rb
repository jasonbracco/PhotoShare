class ReviewsController < ApplicationController

    def create
        review=Review.create!(review_params)
        render json: review
    end

    def index
        reviews=Review.all 
        render json: reviews
    end

    def update
        review=Review.find_by(id: params[:id])
        review.update!(review_params)
        render json: review
    end

    def destroy
        review=Review.find_by(id: params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:content, :user_id, :photograph_id)
    end
end
