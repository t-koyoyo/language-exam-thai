class CreateQuestionAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :question_answers, comment: '問題解答' do |t|
      t.references :question, foreign_key: true, comment: "試験"
      t.integer    :choice_number,               comment: "選択番号"
      t.text       :sentence,                    comment: "解答文"
      t.boolean    :correct_flg,                 comment: "正解フラグ"
    end
  end
end
