class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :state_province
      t.string :country
      t.string :bio
      t.string :username
      t.string :password_digest
      
      t.timestamps
    end
  end
end
