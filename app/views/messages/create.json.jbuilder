json.(@message, :content, :image)
json.id       @message.id
json.name     @message.user.name
json.content  @message.content
json.image    @message.image
json.date     @message.created_at.strftime("%Y-%m-%d %H:%M")
json.group_id @message.group_id
