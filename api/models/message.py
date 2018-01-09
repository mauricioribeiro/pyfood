from django.db import models

from api.models import Client
from . import utils


class Message(models.Model):
    action = models.CharField(max_length=utils.SMALL_LENGTH, blank=True, null=True, verbose_name='Nome')
    content = models.TextField(verbose_name='Conteúdo')
    source = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.SOURCES, default='FACEBOOK', verbose_name='Plataforma')
    session = models.CharField(max_length=utils.MEDIUM_LENGTH, blank=True, null=True, verbose_name='Sessão')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Cliente')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')

    def __str__(self): return self.name

    class Meta:
        verbose_name = 'Mensagem'
        ordering = []
