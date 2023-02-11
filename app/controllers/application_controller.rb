class ApplicationController < ActionController::API
  include ActionController::
  
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  before_action :authorize

  private

  def render_unprocessable_entity_response(exception)
    render json: {errors: exception.record.errors.full_messages}, status: :render_unprocessable_entity_response
  end

  def authorize
    @current_user=User.find_by(id: session[:user_id])
    render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @current_user
  end

end
