from django.db import models
from django.db.models import CASCADE

from api.models.client import Client
from . import utils


class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=CASCADE, related_name='orders', verbose_name='Cliente')
    status = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.ORDER_STATUSES, default='OPENED', verbose_name='Status')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    def __str__(self): return '#%d (%s)' % (self.id, self.status)

    class Meta:
        verbose_name = 'Pedido'
        ordering = ['id', 'status']
