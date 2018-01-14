from api.models import Client, Order, Product, Item
from api.models.utils import *
from api.services.answer import AnswerService


class OrderService:

    def __init__(self, webhook_data):
        self.data = webhook_data

    def extract_parameters(self):
        keyword, amount = None, None

        if self.data.parameters:
            if self.data.parameters['food']:
                keyword = self.data.parameters['food']

            if self.data.parameters['drink']:
                keyword = self.data.parameters['drink']

            if self.data.parameters['amount']:
                amount = int(self.data.parameters['amount'])

        return keyword, amount

    def answer(self):
        if self.data:
            if self.data.sender_id and self.data.source:
                client = Client.objects.filter(token=self.data.sender_id, source=self.data.source.upper()).first()
                order = Order.objects.filter(client=client, status=OPENED).first() if client else None

                if self.data.action == ORDER_CREATE:
                    return self.create(client, order)

                if self.data.action == ORDER_ADD_ITEM:
                    return self.add_item(order)

                if self.data.action == ORDER_REMOVE_ITEM:
                    return self.remove_item(order)

                if self.data.action == ORDER_LIST_ITEMS:
                    return self.list_items(order)

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
        keyword, amount = self.extract_parameters()

        if keyword:
            product = Product.objects.filter(keyword=keyword).first()

            if product:
                item = Item(order=order, product=product, amount=amount)
                item.save()
                return None

            return AnswerService.answer(AnswerService.product_not_found(keyword))
        return AnswerService.answer(AnswerService.product_is_required())

    def remove_item(self, order):
        keyword, amount = self.extract_parameters()
        if keyword:
            if order.items:

                for item in order.items.all():
                    if item.product.keyword == keyword:
                        if not amount:
                            amount = 1

                        if amount > item.amount:
                            return AnswerService.answer(AnswerService.remove_item_amount_is_invalid(amount, item))

                        if amount == item.amount:
                            item.delete()
                        else:
                            item.amount = item.amount - amount
                            item.save()

                        return None

                return AnswerService.answer(AnswerService.product_not_found_in_order(keyword))
            return AnswerService.answer(AnswerService.order_is_empty())
        return AnswerService.answer(AnswerService.product_is_required())

    def list_items(self, order):
        answer = AnswerService.order_not_found()
        if order:
            answer = self.data.default_message + " " + AnswerService.order_items(order)
        return AnswerService.answer(answer, self.data.source)

    def finish(self, order):
        answer = AnswerService.order_not_found()
        if order:
            answer = AnswerService.order_items(order) + self.data.default_message

        return AnswerService.answer(answer, self.data.source)

    def confirm(self, client, order):
        if self.data.contexts:

            if FINISH_CONTEXT in self.data.contexts:
                if order:
                    # TODO check if there is items
                    order.status = PROCESSED
                    order.save()
        return None
