class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :authentication_keys => [:user_id]
  # deviseでemailを不必要にする
  def email_required?
    false
  end
  def email_changed?
    false
  end
  def will_save_change_to_email?
    false
  end
end
