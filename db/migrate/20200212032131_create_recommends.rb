class CreateRecommends < ActiveRecord::Migration[6.0]
  def change
    create_table :recommends, comment: 'おすすめ' do |t|
      t.string  :type,        comment: '種別'
      t.string  :title,       comment: 'タイトル'
      t.text    :description, comment: '説明'
      t.string  :site_url,    comment: 'サイトURL'
      t.string  :image_url,   comment: '画像URL'
      t.integer :click,       comment: 'クリック数'
      t.boolean :delete_flg,  comment: '削除フラグ'
    end
  end
end
