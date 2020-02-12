class QuestionController < ApplicationController

  def index
    @current_date = Date.today
    @next_exam = Exam.find_by("event_date >= ?", @current_date)
    @rest_date = (@next_exam.event_date - @current_date).numerator
  end

  def setting
  end

  def practice
    gon.question_correct = 1
  end

end
