class Review < ApplicationRecord

    belongs_to :user
    belongs_to :photograph

    validates :content, presence: true
    validates :user_id, presence: true
    validates :photograph_id, presence: true

end
