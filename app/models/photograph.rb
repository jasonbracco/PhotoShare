class Photograph < ApplicationRecord
    has_one_attached :image

    validates :name, presence: true
    validates :price, presence: true
    validates_numericality_of :price
    validates :price, format: { with: /\A\d+\.\d{2}\z/}
    validates :description, presence: true
    validates :image, presence: true

    belongs_to :user
    has_many :orders
    has_many :users, through: :orders
    has_many :reviews

end
