class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :photograph_id

  belongs_to :user
  belongs_to :photograph
  
end
