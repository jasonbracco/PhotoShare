class CreatePhotographs < ActiveRecord::Migration[6.1]
  def change
    create_table :photographs do |t|
      t.string :name
      t.string :description
      t.belongs_to :user, index: true, foreign_key: true
      t.decimal :price, precision: 10, scale: 2
      
      t.timestamps
    end
  end
end
