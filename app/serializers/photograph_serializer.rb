class PhotographSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers #helper to generate url 

  attributes :id, :name, :description, :formatted_price, :user_id, :image, :user, :orders

  belongs_to :user
  has_many :orders
  has_many :reviews

  def formatted_price
    # if object.price =~ /\A\d+(\.\d{2})?\z/
      format("%.2f", object.price) 
    # else
      # object.price.to_s
    # end
  end
 
  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
  

  #Create a blob_path for the object image (a blob is a record that contains metadata about a file and a key for where that file resides on the image hosting service)
  #Provides the exact path for the link
  #Perform all of this only if the object (post) has an image attached

end
