Rails.application.routes.draw do
  
  resources :orders, only: [:create]
  resources :photographs, only: [:create, :index, :destroy, :update]
  resources :users, only: [:index]
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
