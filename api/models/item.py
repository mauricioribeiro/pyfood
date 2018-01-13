from django.db import models

from api.models import Order, Product


class Item(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name='Pedido')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='items', verbose_name='Produto')
    amount = models.PositiveSmallIntegerField(default=1, verbose_name="Quantidade")
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    @property
    def name(self):
        return self.product.name if self.product else None

    def __str__(self): return '%s - %s' % (self.name, self.order)

    class Meta:
        verbose_name = 'Item'
        ordering = ['order', 'product']
