class CreateExamGrades < ActiveRecord::Migration[6.0]
  def change
    create_table :exam_grades do |t|
      t.references :exam, foreign_key: true, comment: "試験"
      t.string     :grade,                   comment: "級数"
      t.integer    :total_application,       comment: "申し込み者数"
      t.integer    :total_Examinee,          comment: "受験者数"
      t.integer    :total_pass,              comment: "合格者数"
      t.float      :pass_rate,               comment: "合格率"
    end
  end
end
