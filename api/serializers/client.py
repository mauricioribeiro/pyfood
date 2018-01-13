from rest_framework.serializers import ModelSerializer

from api import models


class ClientSerializer(ModelSerializer):
    class Meta:
        model = models.Client
        fields = (
            'id',
            'name',
            'token',
            'source',
            'created_on',
            'updated_on'
        )
