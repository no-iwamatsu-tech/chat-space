class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, presence: true
  validate :users_no_empty

  def users_no_empty
    if users.empty?
      errors.add("Users", "が設定されていません。")
    end
  end
end
