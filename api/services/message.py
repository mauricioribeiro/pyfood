from api.models import Message, Client


class MessageService:

    @staticmethod
    def log(webhook_data, client=None, order=None):
        if webhook_data:
            if not client:
                client = Client.objects.filter(
                    token=webhook_data.sender_id,
                    source=webhook_data.source.upper() if webhook_data.source else None
                ).first()

            message = Message(
                action=webhook_data.action,
                content=webhook_data.message,
                source=webhook_data.source,
                session=webhook_data.session_id,
                client=client,
                order=order
            )
            return message.save()
        return False
