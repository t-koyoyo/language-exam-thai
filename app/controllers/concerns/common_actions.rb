module CommonActions

  extend ActiveSupport::Concern
  include EnumVariable

  # 共通JS変数
  def js_parameters
    gon.user = current_user
    gon.dictionary_languages_select = dictionary_language()
  end
 
  # ヘッダー部次回試験情報
  def next_exam
    @current_date = Date.today
    @next_exam = Exam.find_by("event_date >= ?", @current_date)
    @rest_date = (@next_exam.event_date - @current_date).numerator
  end

  # おすすめサイト・動画共通検索
  def recommend_search
    @current_page = @recommend.current_page
    @total_page = @recommend.total_pages
    @is_first_page = @recommend.first_page?
    @is_end_page = @recommend.last_page?
    # クリック数→おすすめ度
    click = []
    Recommend.all.each do |recom|
      click.push(recom.click)
    end
    click = click.uniq.sort!.reverse
    decrease_parsent = 100 / click.count
    @recommend.each do |recom|
      recom.click = ((100.0 - (decrease_parsent * click.index(recom.click))) / 10.0).round
    end
  end

 end