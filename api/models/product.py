from django.db import models

from . import utils


class Product(models.Model):
    name = models.CharField(max_length=utils.MEDIUM_LENGTH, blank=True, null=True, verbose_name='Nome')
    keyword = models.CharField(max_length=utils.SMALL_LENGTH, unique=True, verbose_name='Palavra Chave')
    category = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.PRODUCT_CATEGORIES, verbose_name='Categoria')
    price = utils.MoneyField(verbose_name='Preço')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    def __str__(self): return self.name

    class Meta:
        verbose_name = 'Produto'
        ordering = ['name']
