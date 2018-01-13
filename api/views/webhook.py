from http.client import OK, NO_CONTENT

from rest_framework import generics
from rest_framework.response import Response

from api.serializers.webhook import WebhookSerializer


class WebhookView(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        data = WebhookSerializer(request)

        if data.source == 'facebook':
            return Response(data.answer('Yuuup!'), OK)

        return Response(None, NO_CONTENT)
