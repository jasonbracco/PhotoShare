class PhotographsController < ApplicationController

    def create
        photograph=Photograph.create!(photograph_params)
        render json: photograph
    end

    private

    def photograph_params
        params.permit(:user_id, :name, :description, :price, :image)
    end
end
