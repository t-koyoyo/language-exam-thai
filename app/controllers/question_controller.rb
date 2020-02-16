class QuestionController < ApplicationController
  

  def index
  end

  def setting
  end

  def practice
    gon.question_correct = 1
  end

end
