from api import models
from api.serializers.client import ClientSerializer
from rest_framework import generics


class ClientView:
    model = models.Client
    queryset = models.Client.objects.all()
    serializer_class = ClientSerializer
    view_name = 'client'


class ClientList(ClientView, generics.ListCreateAPIView):
    pass


class ClientDetail(ClientView, generics.RetrieveUpdateDestroyAPIView):
    pass

