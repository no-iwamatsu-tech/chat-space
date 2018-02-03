class MessagesController < ApplicationController
  before_action :fetch_group
  before_action :fetch_messages, only: :index

  def index
    @message = Message.new
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_url(params[:group_id]), notice: "メッセージを送信しました。"
    else
      redirect_to group_messages_url(params[:group_id]), alert: "メッセージを入力してください。"
    end
  end

  private
  def message_params
    params.require(:message).permit(:comment, :image).merge(user_id: current_user.id)
  end

  def fetch_group
    @group = Group.find(params[:group_id])
  end

  def fetch_messages
    @messages = @group.messages.includes(:user)
  end
end
