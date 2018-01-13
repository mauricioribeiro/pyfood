from api import models
from api.serializers.message import MessageSerializer
from rest_framework import generics


class MessageView:
    model = models.Message
    queryset = models.Message.objects.all()
    serializer_class = MessageSerializer
    view_name = 'message'


class MessageList(MessageView, generics.ListCreateAPIView):
    pass


class MessageDetail(MessageView, generics.RetrieveUpdateDestroyAPIView):
    pass

