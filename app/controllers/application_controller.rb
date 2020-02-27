class ApplicationController < ActionController::Base
  
  include CommonActions
  before_action :next_exam, :js_parameters

  # 非同期処理
  def asynchronous
    @response_data = {}
    case params[:type]
    when "recommend_click" # クリック数追加
      Recommend.find(params[:recommend_id]).increment!(:click, 1)
    when "dictionary_thai" # 辞書検索[タイ語→日本語]
      @response_data = []
      @aplicable_data = Dictionary.where("thai_text LIKE ?", "%"+params[:input]+"%")
      @aplicable_data.each do |data| # タイ語訳から入力文字と同一語訳を含むレコードを抽出
        thai_text = data.thai_text.split(",")
        @response_data.push(data) if thai_text.include?(params[:input])
      end
    when "dictionary_japanese" # 辞書検索[日本語→タイ語]
      @response_data = []
      @aplicable_data = Dictionary.where("japanese_text LIKE ?", "%"+params[:input]+"%")
      @aplicable_data.each do |data| # 日本語訳から入力文字と同一語訳を含むレコードを抽出
        japanese_text = data.japanese_text.split(",")
        @response_data.push(data) if japanese_text.include?(params[:input])
      end
    else
    end
    render json: @response_data
  end

end
