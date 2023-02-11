class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :first_name, presense: true
    validates :last_name, presense: true
    validates :city, presense: true
    validates :state_province, presense: true
    validates :country, presense: true
    validates :bio, presense: true


end
