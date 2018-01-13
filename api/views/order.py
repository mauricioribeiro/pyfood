from api import models
from api.serializers.order import OrderSerializer
from rest_framework import generics


class OrderView:
    model = models.Order
    queryset = models.Order.objects.all()
    serializer_class = OrderSerializer
    view_name = 'order'


class OrderList(OrderView, generics.ListCreateAPIView):
    pass


class OrderDetail(OrderView, generics.RetrieveUpdateDestroyAPIView):
    pass

