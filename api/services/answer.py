import random


class AnswerService:

    @staticmethod
    def answer(text, source=None):
        return {
            "speech": text,
            "displayText": None,
            "contextOut": None,
            "source": source,
            "data": None
        }

    @staticmethod
    def get_money(value):
        if value:
            return 'R$ %.2f' % round(float(value), 2)
        return None

    @staticmethod
    def order_items(order):
        answer = 'Aqui está o que pediu:\n\n'
        for item in order.items.all():
            answer += '%d %s %s\n' % (item.amount, item.name, AnswerService.get_money(item.product.price))
        answer += '\nTotal: %s\n' % AnswerService.get_money(order.total)
        return answer

    @staticmethod
    def product_is_required():
        answers = [
            'Desculpe, mas não entendi... por favor, poderia repetir, me informando a quantidade e o que deseja?',
            'Ops, acho que não entendi... pode me dizer a quantidade e o que deseja, por favor?'
        ]
        return answers[random.randint(0, len(answers) - 1)]

    @staticmethod
    def product_not_found(keyword):
        answers = [
            'Desculpe, mas não consegui encontrar nenhum %s',
            'Ops.. nós não temos %s',
            'Nao encontrei %s nos nosso cardapio'
        ]
        return answers[random.randint(0, len(answers) - 1)] % keyword

    @staticmethod
    def product_not_found_in_order(keyword):
        answers = [
            'Desculpe, mas não consegui encontrar nenhum %s no seu pedido',
            'Ops.. não anotei nenhum %s no seu pedido',
            'Nao encontrei %s no seu pedido'
        ]
        return answers[random.randint(0, len(answers) - 1)] % keyword

    @staticmethod
    def order_not_found():
        answers = [
            'Desculpe, mas acho que você não tem nenhum pedido aberto ainda :(',
            'Ops.. ainda não há nenhum pedido aberto para você :/',
            'Olha, não encontrei nenhum pedido aberto para ti :S'
        ]
        return answers[random.randint(0, len(answers) - 1)]

    @staticmethod
    def order_is_empty():
        answers = [
            'Desculpe, mas acho que seu pedido está vázio ainda',
            'Ops.. ainda não há nenhum item no seu pedido',
            'Olha, não encontrei nenhum item no seu pedido ainda'
        ]
        return answers[random.randint(0, len(answers) - 1)]

    @staticmethod
    def remove_item_amount_is_invalid(remove_amount, item):
        answers = [
            'Desculpe, mas seu pedido possui apenas %d %s' % (item.amount, item.name),
            'Ops.. não é possível remover %d, pois você só pediu %d %s' % (remove_amount, item.amount, item.name),
            '%d? Seu pedido só tem %d %s' % (remove_amount, item.amount, item.name)
        ]
        return answers[random.randint(0, len(answers) - 1)]