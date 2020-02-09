class CreateExams < ActiveRecord::Migration[6.0]
  def change
    create_table :exams, comment: '試験' do |t|
      t.string  :name,         null:false, comment: "試験名"
      t.string  :language,     null:false, comment: "試験言語"
      t.date    :event_date,   null:false, comment: "開催日時"
      t.string  :event_status, null:false, comment: "開催状況"
      t.integer :total_application,        comment: "申込者数"
      t.integer :total_Examinee,           comment: "受験者数"
      t.integer :total_pass,               comment: "合格者数"
      t.float   :pass_rate,                comment: "合格率"
    end
  end
end