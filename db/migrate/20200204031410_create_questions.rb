class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.references :exam_grade,                 foreign_key: true, comment: "試験級数"
      t.integer    :question_number, null:false,                   comment: "問題番号"
      t.string     :question_field,                                comment: "問題分野"
      t.text       :question_sentence,                             comment: "問題文"
      t.string     :answer_method,                                 comment: "解答方法"
      t.text       :answer_choice1,                                comment: "解答選択肢1"
      t.text       :answer_choice2,                                comment: "解答選択肢2"
      t.text       :answer_choice3,                                comment: "解答選択肢3"
      t.text       :answer_choice4,                                comment: "解答選択肢4"
      t.integer    :answer_number,                                 comment: "解答番号"
    end
  end
end
