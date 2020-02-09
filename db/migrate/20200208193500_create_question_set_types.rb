class CreateQuestionSetTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :question_set_types, comment: '出題設定種別' do |t|
      t.string :name, comment: "種別名"
    end
  end
end
