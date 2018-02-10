json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M:%S")
json.comment  @message.comment
json.image_url @message.image.url
json.group_id @group.id
json.last_message @group.last_message
json.flash_key "notice"
json.flash_value "メッセージを送信しました。"
json.error false