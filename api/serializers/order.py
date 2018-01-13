from rest_framework.serializers import ModelSerializer

from api import models


class OrderSerializer(ModelSerializer):
    class Meta:
        model = models.Order
        fields = (
            'id',
            'client',
            'status',
            'created_on',
            'updated_on'
        )
