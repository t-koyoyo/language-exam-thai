# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_04_031410) do

  create_table "exam_grades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "exam_id", comment: "試験"
    t.string "grade", comment: "級数"
    t.integer "total_application", comment: "申し込み者数"
    t.integer "total_Examinee", comment: "受験者数"
    t.integer "total_pass", comment: "合格者数"
    t.float "pass_rate", comment: "合格率"
    t.index ["exam_id"], name: "index_exam_grades_on_exam_id"
  end

  create_table "exams", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", null: false, comment: "試験名"
    t.string "language", null: false, comment: "試験言語"
    t.date "event_date", null: false, comment: "開催日時"
    t.string "event_status", null: false, comment: "開催状況"
    t.integer "total_application", comment: "申し込み者数"
    t.integer "total_Examinee", comment: "受験者数"
    t.integer "total_pass", comment: "合格者数"
    t.float "pass_rate", comment: "合格率"
  end

  create_table "questions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "exam_grade_id", comment: "試験級数"
    t.integer "question_number", null: false, comment: "問題番号"
    t.string "question_field", comment: "問題分野"
    t.text "question_sentence", comment: "問題文"
    t.string "answer_method", comment: "解答方法"
    t.text "answer_choice1", comment: "解答選択肢1"
    t.text "answer_choice2", comment: "解答選択肢2"
    t.text "answer_choice3", comment: "解答選択肢3"
    t.text "answer_choice4", comment: "解答選択肢4"
    t.integer "answer_number", comment: "解答番号"
    t.index ["exam_grade_id"], name: "index_questions_on_exam_grade_id"
  end

  add_foreign_key "exam_grades", "exams"
  add_foreign_key "questions", "exam_grades"
end
