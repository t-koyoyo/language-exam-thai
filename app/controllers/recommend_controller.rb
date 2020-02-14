class RecommendController < ApplicationController

  def index
    @current_date = Date.today
    @next_exam = Exam.find_by("event_date >= ?", @current_date)
    @rest_date = (@next_exam.event_date - @current_date).numerator

    # おすすめサイト・動画情報
    @recommend = Recommend.all
    click = []
    @recommend.each do |recom|
      click.push(recom.click)
    end
    click = click.uniq.sort!.reverse
    decrease_parsent = 100 / click.count
    @recommend.each do |recom|
      recom.click = ((100.0 - (decrease_parsent * click.index(recom.click))) / 10.0).round
    end

    # ラベル詳細検索
    gon.label_name = Label.all.pluck(:name)
    gon.label_font_color = Label.all.pluck(:font_color)
    gon.label_background_color = Label.all.pluck(:background_color)
  end

end
