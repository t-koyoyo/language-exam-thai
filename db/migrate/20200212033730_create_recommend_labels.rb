class CreateRecommendLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :recommend_labels, comment: "おすすめラベル" do |t|
      t.references :recommend, foreign_key: true, comment: "おすすめ"
      t.references :label,     foreign_key: true, comment: "ラベル"
    end
  end
end
