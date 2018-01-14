from rest_framework.serializers import ModelSerializer

from api import models
from api.serializers.product import ProductSerializer


class ItemSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = models.Item
        fields = (
            'id',
            'order',
            'product',
            'amount',
            'created_on',
            'updated_on'
        )
