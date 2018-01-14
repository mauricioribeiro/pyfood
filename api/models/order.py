from django.db import models

from api.models.client import Client
from api.models.utils import OPENED
from . import utils


class Order(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='orders', verbose_name='Cliente')
    status = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.ORDER_STATUSES, default=OPENED,
                              verbose_name='Status')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    def __str__(self): return '#%d (%s)' % (self.id, self.status)

    @property
    def item_names(self):
        items = []
        if self.items:
            return ['%d %s' % (item.amount, item.name) for item in self.items]
        return None

    class Meta:
        verbose_name = 'Pedido'
        ordering = ['id', 'status']
