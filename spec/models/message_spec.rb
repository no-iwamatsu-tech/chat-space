require "rails_helper"
describe Message do
  describe "#create" do

    context "can save" do

      it "is valid with comment." do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      it "is valid with image." do
        message = build(:message, comment: nil)
        expect(message).to be_valid
      end

      it "is valid with comment and image." do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context "cannot save" do

      it "is invalid without comment and image." do
        message = build(:message, comment: nil, image: nil)
        message.valid?
        expect(message.errors[:comment]).to include("が入力されていません。")
      end

      it "is invalid without group_id." do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("は必須です。")
      end

      it "is invalid without user_id." do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("は必須です。")
      end
    end
  end
end