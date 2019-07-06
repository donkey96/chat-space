json.body @message.body
json.user_name @message.user.name
json.image @message.image
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id