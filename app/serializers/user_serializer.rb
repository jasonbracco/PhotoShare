class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :city, :state_province, :country, :bio, :username, :password, :password_confirmation
end
