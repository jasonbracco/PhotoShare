Rails.application.routes.draw do
  
  resources :reviews, only: [:create, :show, :index, :destroy]
  resources :orders, only: [:create, :index]
  resources :photographs
  resources :users, only: [:index, :show, :update]
  
  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
  