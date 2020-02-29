class ApplicationController < ActionController::Base
  
  include CommonActions
  before_action :next_exam, :js_parameters

  # 非同期処理
  def asynchronous
    @response_data = {}
    case params[:type]
    when "recommend_click" # クリック数追加
      Recommend.find(params[:recommend_id]).increment!(:click, 1)
    when "dictionary"      # 辞書検索[入力言語→出力言語]
      @response_data = []
      @aplicable_data = Dictionary.where(params[:input_language]+"_text LIKE ?", "%"+params[:input_text]+"%")
      @aplicable_data.each do |data| # 入力語訳から入力文字と同一語訳を含むレコードを抽出
        text = data[params[:input_language]+"_text"].split(",")
        @response_data.push(data) if text.include?(params[:input_text])
      end
    else
    end
    render json: @response_data
  end

end
