class GroupsController < ApplicationController
  before_action :fetch_group, only: [:edit, :update]

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました。"
    else
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "グループを編集しました。"
    else
      render :edit
    end
  end

  private
  def group_params
    ret_params = params.require(:group).permit(:name, { user_ids: [] })
    ret_params["user_ids"] << current_user.id
    return ret_params
  end

  def fetch_group
    @group = Group.find(params[:id])
  end
end
