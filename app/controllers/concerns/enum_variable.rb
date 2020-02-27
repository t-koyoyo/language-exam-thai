module EnumVariable

  extend ActiveSupport::Concern

  # 辞書対象言語選択プルダウン
  def dictionary_language
    @languages = {
      "japanese": "日本語",
      "thai": "タイ語",
      "english": "英語",
      "italian": "イタリア語",
      "chinese": "中国語",
      "french": "フランス語",
      "german": "ドイツ語",
      "spanish": "スペイン語",
      "korean": "韓国語",
      "russian": "ロシア語",
      "indonesian": "インドネシア語",
      "arabic": "アラビア語",
      "greek": "ギリシャ語"
    }
    return @languages
  end

end