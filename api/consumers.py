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
            'action': message.action,
            'message': {
                'id': message.id,
                'content': message.content,
                'created_on': str(message.created_on)
            },
            'client': {
                'id': message.client.id if message.client else None,
                'name': message.client.name if message.client else None
            },
            'order': {
                'id': message.order.id if message.order else None,
                'created_on': str(message.order.created_on) if message.order else None
            }
        })
    })
