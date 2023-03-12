class User < ApplicationRecord
    has_secure_password
    has_one_attached :image

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :city, presence: true
    validates :state_province, presence: true
    validates :country, presence: true
    validates :bio, presence: true
    validates :username, presence: true, uniqueness: true
    validates :image, presence: true

    has_many :selling, class_name: "Photograph", foreign_key: "user_id" #this is an association to the photograph model, and are the photos this user is selling
    has_many :orders
    has_many :photographs, through: :orders #these photographs are the ones the user has bought
    has_many :reviews

end
