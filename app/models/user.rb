class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  has_many :groups, through: :members
  has_many :members
  has_many :messages

  validates :name,
    presence: true,
    uniqueness: { case_sensitive: :false }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
