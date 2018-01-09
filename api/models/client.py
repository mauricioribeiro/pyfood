from django.db import models
from . import utils


class Client(models.Model):
    name = models.CharField(max_length=utils.MEDIUM_LENGTH, blank=True, null=True, verbose_name='Nome')
    token = models.CharField(max_length=utils.MEDIUM_LENGTH, unique=True, verbose_name='Token')
    source = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.SOURCES, default='FACEBOOK', verbose_name='Plataforma')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    def __str__(self): return self.name

    class Meta:
        verbose_name = 'Cliente'
        ordering = ['name']
