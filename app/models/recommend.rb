class Recommend < ApplicationRecord
  has_many :recommend_labels
  self.inheritance_column = :_type_disabled
  paginates_per 10
end
