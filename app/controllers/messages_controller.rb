class MessagesController < ApplicationController
  before_action :fetch_group

  def index
    @message = Message.new
    fetch_messages
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(Group.find(params[:group_id])), notice: "メッセージを送信しました。"
    else
      fetch_messages
      flash[:alert] = "メッセージを入力してください。"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:comment).merge(user_id: current_user.id)
  end

  def fetch_group
    @group = Group.find(params[:group_id])
  end

  def fetch_messages
    @messages = @group.messages.includes(:user)
  end
end
