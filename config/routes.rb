Rails.application.routes.draw do
  
  resources :reviews, only: [:create, :destroy, :update, :index]
  resources :orders, only: [:create]
  resources :photographs
  resources :users, only: [:index, :show, :update]

  get '/orders/:user_id', to: 'orders#show'
  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
  