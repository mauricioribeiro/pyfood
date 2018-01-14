from api.models import Client, Order, Product, Item
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

                if self.data.action == ORDER_ADD_ITEM:
                    return self.add_item(order)

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

    def add_item(self, order):
        if self.data.parameters:
            keyword, amount = None, None

            if self.data.parameters['food']:
                keyword = self.data.parameters['food']

            if self.data.parameters['drink']:
                keyword = self.data.parameters['drink']

            if self.data.parameters['amount']:
                amount = int(self.data.parameters['amount'])

            if keyword:
                product = Product.objects.filter(keyword=keyword).first()

                if product:
                    item = Item(order=order, product=product, amount=amount)
                    item.save()
                    return None

                return AnswerService.answer(AnswerService.product_not_found(keyword))
            else:
                AnswerService.answer(AnswerService.product_is_required())
        return None

    def finish(self, order):
        answer = AnswerService.order_not_found()
        if order:
            answer = AnswerService.order_finish(order.item_names) + self.data.default_message

        return AnswerService.answer(answer, self.data.source)

    def confirm(self, client, order):
        if self.data.contexts:

            if FINISH_CONTEXT in self.data.contexts:
                if order:
                    # TODO check if there is items
                    order.status = PROCESSED
                    order.save()
        return None

