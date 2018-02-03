require "rails_helper"

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe "GET #index" do

    context "login" do
      before do
        login_user user
      end

      it "assigns @group." do
        get :index, params: { group_id: group.id }
        expect(assigns(:group)).to eq group
      end

      it "assigns @message." do
        get :index, params: { group_id: group.id }
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "assigns @messages." do
        messages = create_list(:message, 10, group_id: group.id, user_id: user.id)
        get :index, params: { group_id: group.id }
        expect(assigns(:messages)).to match(messages)
      end

      it "renders index." do
        get :index, params: { group_id: group.id }
        expect(response).to render_template :index
      end
    end

    context "not login" do

      it "redirects to new_user_session_path." do
        get :index, params: { group_id: group.id }
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe "POST #create" do

    context "login" do
      before do
        login_user user
      end

      context "can save" do
        let(:params) {{
          group_id: group.id,
          user_id:  user.id,
          message:  attributes_for(:message)
        }}

        it "save message." do
          expect {
            post :create,
            params: params
          }.to change(Message, :count).by(1)
        end

        it "redirects to group_messages_path" do
          post :create, params: params
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context "cannot save" do
        let(:params) {{
          group_id: group.id,
          user_id:  user.id,
          message:  attributes_for(:message, comment: nil, image: nil)
        }}

        it "not save message." do
          expect {
            post :create,
            params: params
          }.not_to change(Message, :count)
        end

        it "redirects to group_messages_path" do
          post :create, params: params
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
    end

    context "not login" do
      let(:params) {{
        group_id: group.id,
        user_id:  user.id,
        message:  attributes_for(:message)
      }}

      it "redirects to new_user_session_path." do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
