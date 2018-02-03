FactoryGirl.define do

  factory :message do
    comment     Faker::Lorem.characters
    image       Rack::Test::UploadedFile.new(File.join(Rails.root, "spec/fixtures/apple.jpg"))
    association :user, factory: :user
    association :group, factory: :group
  end
end