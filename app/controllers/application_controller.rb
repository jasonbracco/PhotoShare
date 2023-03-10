class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveSupport::MessageVerifier::InvalidSignature, with: :internal_server_error_response
  
  before_action :authorize

  private

  def render_unprocessable_entity_response(exception)
    render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
  end

  def authorize
    @current_user=User.find_by(id: session[:user_id])
    render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @current_user
  end

  def internal_server_error_response
    render json: {errors: ["Attach a picture"]}, status: :internal_server_error
  end

end
