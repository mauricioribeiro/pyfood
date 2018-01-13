from http.client import OK, NO_CONTENT

from rest_framework import generics
from rest_framework.response import Response

from api.serializers.webhook import WebhookSerializer
from api.services.order import OrderService


class WebhookView(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        data = WebhookSerializer(request)

        if data.source == 'facebook':
            order_service = OrderService(data)
            return Response(order_service.answer(), OK)

        return Response(None, NO_CONTENT)
