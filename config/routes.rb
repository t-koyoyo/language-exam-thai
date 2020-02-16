Rails.application.routes.draw do
  
  root to: 'question#index'
  get "/question", to: "question#setting"
  post "/question", to: "question#practice"
  post "/recommend", to: "recommend#index"

  # 非同期Ajaxリクエスト
  get "asynchronous", to: "application#asynchronous"
end
