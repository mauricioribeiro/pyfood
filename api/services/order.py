from api.models import Client, Order
from api.models.utils import ORDER_FINISH
from api.services.answer import AnswerService


class OrderService:

    def __init__(self, webhook_data):
        self.data = webhook_data

    def answer(self):
        if self.data:
            if self.data.sender_id and self.data.source:
                client = Client.objects.filter(token=self.data.sender_id, source=self.data.source.upper()).first()
                order = Order.objects.filter(client=client).first() if client else None

                if self.data.action == ORDER_FINISH:
                    return self.finish(order)
        return None

    def finish(self, order):
        answer = AnswerService.order_not_found()
        if order:
            answer = AnswerService.order_finish(['1 x-bacon', '4 heinekens']) + self.data.default_message

        return AnswerService.answer(answer, self.data.source)

    def confirm_finish(self, order):
        pass

