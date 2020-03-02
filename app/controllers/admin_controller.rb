class AdminController < ApplicationController

  def dictionary_list
    @dictionary_columns = Dictionary.column_names
    @dictionary_records = Dictionary.all
  end

end
