class CreateLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :labels, comment: 'ラベル' do |t|
      t.string :name,  comment: 'ラベル名'
      t.string :color, comment: 'ラベル色'
    end
  end
end