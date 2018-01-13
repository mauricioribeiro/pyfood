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
    def order_finish(items):
        answer = 'Aqui esta o que pediu:\n'
        for item in items:
            answer += ' %s\n' % item
        answer += '\n'
        return answer

    @staticmethod
    def order_not_found():
        answers = [
            'Desculpe, mas acho que voce nao tem nenhum pedido aberto ainda :(',
            'Ops.. ainda nao ha nenhum pedido aberto para voce :/',
            'Olha, nao encontrei nenhum pedido aberto para ti :S'
        ]
        return answers[random.randint(0, len(answers)-1)]