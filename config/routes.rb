Rails.application.routes.draw do
  
  root to: 'question#index'
  get "/question", to: "question#setting"
  post "/question", to: "question#practice"
  get "/recommend", to: "recommend#index"

end
