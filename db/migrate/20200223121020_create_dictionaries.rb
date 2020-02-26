class CreateDictionaries < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionaries, comment: "辞書" do |t|
      t.string :type,             comment: "種別"
      t.text   :japanese_text,    comment: "日本語文字"
      t.string :japanese_voice,   comment: "日本語音声"
      t.text   :thai_text,        comment: "タイ語文字"
      t.string :thai_voice,       comment: "タイ語音声"
      t.text   :english_text,     comment: "英語文字"
      t.string :english_voice,    comment: "英語音声"
      t.text   :italian_text,     comment: "イタリア語文字"
      t.string :italian_voice,    comment: "イタリア語音声"
      t.text   :chinese_text,     comment: "中国語文字"
      t.string :chinese_voice,    comment: "中国語音声"
      t.text   :french_text,      comment: "フランス語文字"
      t.string :french_voice,     comment: "フランス語音声"
      t.text   :german_text,      comment: "ドイツ語文字"
      t.string :german_voice,     comment: "ドイツ語音声"
      t.text   :spanish_text,     comment: "スペイン語文字"
      t.string :spanish_voice,    comment: "スペイン語音声"
      t.text   :korean_text,      comment: "韓国語文字"
      t.string :korean_voice,     comment: "韓国語音声"
      t.text   :russian_text,     comment: "ロシア語文字"
      t.string :russian_voice,    comment: "ロシア語音声"
      t.text   :indonesian_text,  comment: "インドネシア語文字"
      t.string :indonesian_voice, comment: "インドネシア語音声"
      t.text   :arabic_text,      comment: "アラビア語文字"
      t.string :arabic_voice,     comment: "アラビア語音声"
      t.text   :greek_text,       comment: "ギリシャ語文字"
      t.string :greek_voice,      comment: "ギリシャ語音声"
    end
  end
end
