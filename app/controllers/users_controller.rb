class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    #post: signup
    def create
        user=User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    #me
    def me
        render json: @current_user, methods: [:unique]
    end

    def index
        users=User.all 
        render json: users
    end 

    def show
        user=User.find(params[:id])
        render json: user
    end

    def update
        user=User.find_by(id: params[:id])
        user.update!(user_params)
        render json: user
    end
 
    private

    def user_params
        params.permit(:first_name, :last_name, :city, :state_province, :country, :bio, :username, :password, :password_confirmation, :image)
    end
    
end
