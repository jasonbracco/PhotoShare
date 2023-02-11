class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :city, presence: true
    validates :state_province, presence: true
    validates :country, presence: true
    validates :bio, presence: true


end
