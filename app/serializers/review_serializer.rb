class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :user

  belongs_to :user
  belongs_to :photograph
end
