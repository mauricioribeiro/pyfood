from django.db import models
from . import utils


class Client(models.Model):
    name = models.CharField(max_length=utils.MEDIUM_LENGTH, blank=True, null=True, verbose_name='Nome')
    token = models.CharField(max_length=utils.MEDIUM_LENGTH, unique=True, verbose_name='Token')
    token_type = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.TOKEN_TYPES, default='FACEBOOK', verbose_name='Tipo do Token')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    def __str__(self): return '#%d (%s)' % (self.id, self.status)

    class Meta:
        verbose_name = 'Cliente'
        ordering = ['name']
