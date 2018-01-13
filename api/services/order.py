from api.models import Client, Order
from api.models.utils import *
from api.services.answer import AnswerService


class OrderService:

    def __init__(self, webhook_data):
        self.data = webhook_data

    def answer(self):
        if self.data:
            if self.data.sender_id and self.data.source:
                client = Client.objects.filter(token=self.data.sender_id, source=self.data.source.upper()).first()
                order = Order.objects.filter(client=client, status=OPENED).first() if client else None

                if self.data.action == ORDER_CREATE:
                    return self.create(client, order)

                if self.data.action == ORDER_FINISH:
                    return self.finish(order)

                if self.data.action == ORDER_CONFIRM:
                    return self.confirm(client, order)
        return None

    def create(self, client, order):
        if not client:
            # TODO ask client name
            client = Client(token=self.data.sender_id, source=self.data.source)
            client.save()

        if order:
            # TODO ask to client if he wants to clear items
            pass
        else:
            order = Order(client=client)
            order.save()

        return None

    def finish(self, order):
        answer = AnswerService.order_not_found()
        if order:
            answer = AnswerService.order_finish(['1 x-bacon', '4 heinekens']) + self.data.default_message

        return AnswerService.answer(answer, self.data.source)

    def confirm(self, client, order):
        if self.data.contexts:

            if FINISH_CONTEXT in self.data.contexts:
                if order:
                    # TODO check if there is items
                    order.status = PROCESSED
                    order.save()
        return None

