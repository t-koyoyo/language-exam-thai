class RecommendController < ApplicationController

  include CommonActions

  ## おすすめサイト・動画情報
  # 検索条件
  def index
    unless params[:page].present? then  # トップページから遷移時
      params[:page]= 1
      @recommend = Recommend.all.order(click:"DESC").page(params[:page])
      recommend_search()
      # ラベル詳細検索
      gon.label_name = Label.all.pluck(:name)
      gon.label_font_color = Label.all.pluck(:font_color)
      gon.label_background_color = Label.all.pluck(:background_color)
    else                               # 検索表示後ページ移動(非同期再描画)
      if params[:label].present? then
        params[:label] = Label.where(name: params[:label]).pluck(:id)
        @search = Recommend.joins(:recommend_labels).where(recommend_labels: { label_id: params[:label] })
      else
        @search = Recommend.all
      end
      @search = @search.where("type LIKE ?", "%"+params[:type]+"%").where("title LIKE ?", "%"+params[:title]+"%")
      @recommend = @search.order(click:"DESC").page(params[:page])
      recommend_search()
      render 'index_main.js.erb'
    end
  end

end
