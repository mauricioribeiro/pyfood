import json

from channels import Group


def ws_connect(message):
    Group('notifications').add(message.reply_channel)
    message.reply_channel.send({"accept": True})

def ws_disconnect(message):
    Group('notifications').discard(message.reply_channel)


def ws_send(message):
    Group('notifications').send({
        'text': json.dumps({
            'text': message,
            'test': True
        })
    })
