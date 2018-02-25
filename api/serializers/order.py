from rest_framework.serializers import ModelSerializer

from api import models
from api.serializers.client import ClientSerializer
from api.serializers.item import ItemSerializer
from api.serializers.message import MessageSerializer


class OrderSerializer(ModelSerializer):
    items = ItemSerializer(read_only=True, many=True)
    messages = MessageSerializer(read_only=True, many=True)
    client = ClientSerializer(read_only=True)

    class Meta:
        model = models.Order
        fields = (
            'id',
            'client',
            'items',
            'status',
            'status_label',
            'total',
            'messages',
            'created_on',
            'updated_on'
        )
