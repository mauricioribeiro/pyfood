from http.client import OK, BAD_REQUEST

from rest_framework.response import Response

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


class MessageNotificationList(MessageView, generics.ListAPIView, generics.UpdateAPIView):

    def list(self, request, *args, **kwargs):
        self.queryset = self.model.objects.filter(notify=True, visualized=False)
        return super().list(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        if 'id' in request.data:
            notification = self.model.objects.filter(pk=request.data['id']).first()
            if notification:
                notification.visualized = True
                notification.save()
                return Response(self.serializer_class(notification).data, OK)
        return Response({'invalid_data': 'Os dados para visualizar uma notificação são inválidos'}, BAD_REQUEST)


