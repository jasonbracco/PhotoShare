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

    def update
        photograph=Photograph.find_by(id: params[:id])
        photograph.update!(photograph_params)
        render json: photograph
    end

    def show
        photograph=Photograph.find_by(id: params[:id])
        render json: photograph
    end

    private

    def photograph_params
        params.permit(:user_id, :name, :description, :price, :image)
    end
end
