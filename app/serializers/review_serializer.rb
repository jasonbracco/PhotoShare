class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content

  belongs_to :user do
    attribute :first_name
  end
  belongs_to :photograph
end
