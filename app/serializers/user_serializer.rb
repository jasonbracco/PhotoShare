class UserSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers #helper to generate url 

  attributes :id, :first_name, :last_name, :city, :state_province, :country, :bio, :username, :password, :password_confirmation, :image

  has_many :selling, key: :selling
  has_many :orders
  has_many :reviews

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  #Create a blob_path for the object image (a blob is a record that contains metadata about a file and a key for where that file resides on the image hosting service)
  #Provides the exact path for the link
  #Perform all of this only if the object (post) has an image attached

end
