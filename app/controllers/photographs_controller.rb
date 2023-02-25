class PhotographsController < ApplicationController

    def create
        photograph=Photograph.create!(photograph_params)
        render json: photograph
    end

    def index
        photographs=Photograph.all.with_attached_image
        render json: photographs
    end

    def destroy
        photograph=Photograph.find_by(id: params[:id])
        photograph.destroy
        head :no_content
    end


    private

    def photograph_params
        params.permit(:user_id, :name, :description, :price, :image)
    end
end
