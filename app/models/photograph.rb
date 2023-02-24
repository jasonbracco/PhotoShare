class Photograph < ApplicationRecord
    has_one_attached :image

    validates :name, presence: true
    validates :price, presence: true
    validates :description, presence: true
    validates :image, presence: true

    belongs_to :user

end
