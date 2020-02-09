class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions, comment: '試験問題' do |t|
      t.references :exam_grade,     foreign_key: true, comment: "試験級"
      t.integer    :number,                            comment: "試験問題番号"
      t.references :question_field, foreign_key: true, comment: "問題分野"
      t.text       :sentence_long,                     comment: "問題長文"
      t.text       :sentence_short,                    comment: "問題短文"
      t.integer    :answer_method,                     comment: "解答方法"
    end
  end
end
