from http.client import OK
from rest_framework import generics

from rest_framework.response import Response

from api.serializers.webhook import WebhookSerializer


class WebhookView(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        data = WebhookSerializer(request)
        return Response({}, OK)
