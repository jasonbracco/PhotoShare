class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    #post: signup
    def create
        user=User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    #show: me
    def show
        render json: @current_user, methods: [:unique]
    end

    def index
        users=User.all.with_attached_image
        render json: users
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :city, :state_province, :country, :bio, :username, :password, :password_confirmation, :image)
    end
    
end
