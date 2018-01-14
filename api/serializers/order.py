from rest_framework.serializers import ModelSerializer

from api import models
from api.serializers.item import ItemSerializer


class OrderSerializer(ModelSerializer):
    items = ItemSerializer(read_only=True, many=True)

    class Meta:
        model = models.Order
        fields = (
            'id',
            'client',
            'items',
            'status',
            'created_on',
            'updated_on'
        )
