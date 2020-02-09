Rails.application.routes.draw do
  
  root to: 'question#index'
  get "/question", to: "question#setting"
  post "/question", to: "question#practice"

end
