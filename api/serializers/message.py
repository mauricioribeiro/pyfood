from rest_framework.serializers import ModelSerializer

from api import models


class MessageSerializer(ModelSerializer):
    class Meta:
        model = models.Message
        fields = (
            'id',
            'action',
            'content',
            'source',
            'session',
            'client',
            'client_name',
            'order',
            'created_on',
            'updated_on',
            'notify',
            'visualized',
        )
