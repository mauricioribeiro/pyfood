from rest_framework.serializers import ModelSerializer

from api import models


class ProductSerializer(ModelSerializer):
    class Meta:
        model = models.Product
        fields = (
            'id',
            'name',
            'keyword',
            'category',
            'price',
            'created_on',
            'updated_on'
        )
