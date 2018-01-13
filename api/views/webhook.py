from http.client import OK, NO_CONTENT

from rest_framework import generics
from rest_framework.response import Response

from api.models.utils import ORDER_FINISH
from api.serializers.webhook import WebhookSerializer


class WebhookView(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        data = WebhookSerializer(request)

        if data.source == 'facebook':

            if data.action == ORDER_FINISH:
                text = 'Aqui esta o que pediu:\n'
                text += ' 2 x-bacons\n'
                text += ' 4 heinekens\n'
                text += '\n'
                return Response(data.answer(text), OK)

        return Response(None, NO_CONTENT)
