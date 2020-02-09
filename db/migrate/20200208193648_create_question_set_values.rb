class CreateQuestionSetValues < ActiveRecord::Migration[6.0]
  def change
    create_table :question_set_values, comment: '出題設定値' do |t|
      t.references :question_set_type, foreign_key: true, comment: "出題設定種別"
      t.string     :name,                                 comment: "値"
    end
  end
end
