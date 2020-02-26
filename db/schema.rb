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

ActiveRecord::Schema.define(version: 2020_02_23_121020) do

  create_table "dictionaries", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC", comment: "辞書", force: :cascade do |t|
    t.string "type", comment: "種別"
    t.text "japanese_text", comment: "日本語文字"
    t.string "japanese_voice", comment: "日本語音声"
    t.text "thai_text", comment: "タイ語文字"
    t.string "thai_voice", comment: "タイ語音声"
    t.text "english_text", comment: "英語文字"
    t.string "english_voice", comment: "英語音声"
    t.text "italian_text", comment: "イタリア語文字"
    t.string "italian_voice", comment: "イタリア語音声"
    t.text "chinese_text", comment: "中国語文字"
    t.string "chinese_voice", comment: "中国語音声"
    t.text "french_text", comment: "フランス語文字"
    t.string "french_voice", comment: "フランス語音声"
    t.text "german_text", comment: "ドイツ語文字"
    t.string "german_voice", comment: "ドイツ語音声"
    t.text "spanish_text", comment: "スペイン語文字"
    t.string "spanish_voice", comment: "スペイン語音声"
    t.text "korean_text", comment: "韓国語文字"
    t.string "korean_voice", comment: "韓国語音声"
    t.text "russian_text", comment: "ロシア語文字"
    t.string "russian_voice", comment: "ロシア語音声"
    t.text "indonesian_text", comment: "インドネシア語文字"
    t.string "indonesian_voice", comment: "インドネシア語音声"
    t.text "arabic_text", comment: "アラビア語文字"
    t.string "arabic_voice", comment: "アラビア語音声"
    t.text "greek_text", comment: "ギリシャ語文字"
    t.string "greek_voice", comment: "ギリシャ語音声"
  end

  create_table "exam_grades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "試験級", force: :cascade do |t|
    t.bigint "exam_id", comment: "試験"
    t.string "grade", comment: "級数"
    t.integer "total_application", comment: "申込者数"
    t.integer "total_Examinee", comment: "受験者数"
    t.integer "total_pass", comment: "合格者数"
    t.float "pass_rate", comment: "合格率"
    t.index ["exam_id"], name: "index_exam_grades_on_exam_id"
  end

  create_table "exams", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "試験", force: :cascade do |t|
    t.string "name", null: false, comment: "試験名"
    t.string "language", null: false, comment: "試験言語"
    t.date "event_date", null: false, comment: "開催日時"
    t.string "event_status", null: false, comment: "開催状況"
    t.integer "total_application", comment: "申込者数"
    t.integer "total_Examinee", comment: "受験者数"
    t.integer "total_pass", comment: "合格者数"
    t.float "pass_rate", comment: "合格率"
  end

  create_table "labels", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "ラベル", force: :cascade do |t|
    t.string "name", comment: "名前"
    t.string "font_color", comment: "文字色"
    t.string "background_color", comment: "背景色"
  end

  create_table "question_answers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "問題解答", force: :cascade do |t|
    t.bigint "question_id", comment: "試験"
    t.integer "choice_number", comment: "選択番号"
    t.text "sentence", comment: "解答文"
    t.boolean "correct_flg", comment: "正解フラグ"
    t.index ["question_id"], name: "index_question_answers_on_question_id"
  end

  create_table "question_fields", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "問題分野", force: :cascade do |t|
    t.string "name", comment: "分野名"
    t.text "question_description", comment: "分野問題文"
  end

  create_table "question_set_types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "出題設定種別", force: :cascade do |t|
    t.string "name", comment: "種別名"
  end

  create_table "question_set_values", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "出題設定値", force: :cascade do |t|
    t.bigint "question_set_type_id", comment: "出題設定種別"
    t.string "name", comment: "値"
    t.index ["question_set_type_id"], name: "index_question_set_values_on_question_set_type_id"
  end

  create_table "questions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "試験問題", force: :cascade do |t|
    t.bigint "exam_grade_id", comment: "試験級"
    t.integer "number", comment: "試験問題番号"
    t.bigint "question_field_id", comment: "問題分野"
    t.text "sentence_long", comment: "問題長文"
    t.text "sentence_short", comment: "問題短文"
    t.integer "answer_method", comment: "解答方法"
    t.index ["exam_grade_id"], name: "index_questions_on_exam_grade_id"
    t.index ["question_field_id"], name: "index_questions_on_question_field_id"
  end

  create_table "recommend_labels", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "おすすめラベル", force: :cascade do |t|
    t.bigint "recommend_id", comment: "おすすめ"
    t.bigint "label_id", comment: "ラベル"
    t.index ["label_id"], name: "index_recommend_labels_on_label_id"
    t.index ["recommend_id"], name: "index_recommend_labels_on_recommend_id"
  end

  create_table "recommends", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", comment: "おすすめ", force: :cascade do |t|
    t.string "type", comment: "種別"
    t.string "title", comment: "タイトル"
    t.text "description", comment: "説明"
    t.string "site_url", comment: "サイトURL"
    t.string "image_url", comment: "画像URL"
    t.integer "click", comment: "クリック数"
    t.boolean "delete_flg", comment: "削除フラグ"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "user_id", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "admin", default: 0, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "exam_grades", "exams"
  add_foreign_key "question_answers", "questions"
  add_foreign_key "question_set_values", "question_set_types"
  add_foreign_key "questions", "exam_grades"
  add_foreign_key "questions", "question_fields"
  add_foreign_key "recommend_labels", "labels"
  add_foreign_key "recommend_labels", "recommends"
end
