class Order < ApplicationRecord

    belongs_to :user
    belongs_to :photograph

    validates :user_id, presence: true
    validates :photograph_id, presence: true


end
