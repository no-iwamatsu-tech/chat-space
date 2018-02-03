class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, presence: true

  def last_message
    if (last_message = messages.last).nil?
      "まだメッセージはありません。"
    elsif last_message.comment.blank?
      "画像が投稿されています。"
    else
      messages.last.comment
    end
  end
end
