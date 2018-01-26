Rails.application.routes.draw do
  devise_for :users
  get 'messages/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "messages#index"

  resource :user, only: [:edit, :update]
end
