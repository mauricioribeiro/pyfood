from http.client import OK
from rest_framework import generics

from rest_framework.response import Response


class WebhookView(generics.CreateAPIView):

    def create(self, request, *args, **kwargs):
        return Response({}, OK)
