from rest_framework.serializers import ModelSerializer

from api import models


class OrderSerializer(ModelSerializer):
    class Meta:
        model = models.Order
        fields = (
            'id',
            'name',
            'keyword',
            'category',
            'price',
            'created_on',
            'updated_on'
        )
