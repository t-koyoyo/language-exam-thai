class ApplicationController < ActionController::Base
  
  include CommonActions
  before_action :next_exam
  
  # 非同期処理
  def asynchronous
    @response_data = {}
    case params[:type]
    when "recommend_click" # クリック数追加
      Recommend.find(params[:recommend_id]).increment!(:click, 1)
    else
    end
    render json: @response_data
  end

end
