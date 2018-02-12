FactoryGirl.define do

  factory :user do
    password = Faker::Internet.password(8, 128)
    name                  Faker::Name.name
    email                 Faker::Internet.email
    password              password
    password_confirmation password
  end
end