class CreateLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :labels, comment: 'ラベル' do |t|
      t.string :name,             comment: '名前'
      t.string :font_color,       comment: '文字色'
      t.string :background_color, comment: '背景色'
    end
  end
end