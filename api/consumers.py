import json

from channels import Group

from api.serializers.message import MessageSerializer


def ws_connect(message):
    Group('notifications').add(message.reply_channel)
    message.reply_channel.send({"accept": True})


def ws_disconnect(message):
    Group('notifications').discard(message.reply_channel)


def ws_send(message):
    Group('notifications').send({'text': json.dumps(MessageSerializer(message).data) })
