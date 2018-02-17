json.messages do
  json.array! @messages do |message|
    json.user_name message.user.name
    json.created_at message.created_at.strftime("%Y/%m/%d %H:%M:%S")
    json.comment message.comment
    json.image_url message.image.url
  end
end
json.group_id @group.id
json.last_message @group.last_message