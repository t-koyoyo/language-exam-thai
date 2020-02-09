class CreateQuestionFields < ActiveRecord::Migration[6.0]
  def change
    create_table :question_fields, comment: '問題分野' do |t|
      t.string :name,                 comment: "分野名"
      t.text   :question_description, comment: "分野問題文"
    end
  end
end