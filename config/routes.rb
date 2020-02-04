Rails.application.routes.draw do
  
  root to: 'question#index'
  get "/question", to: "question#practice"

end
