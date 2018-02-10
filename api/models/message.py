from django.db import models

from api.models import Client, Order
from . import utils


class Message(models.Model):
    action = models.CharField(max_length=utils.SMALL_LENGTH, blank=True, null=True, verbose_name='Ação')
    content = models.TextField(verbose_name='Conteúdo')
    source = models.CharField(max_length=utils.MEDIUM_LENGTH, choices=utils.SOURCES, default='FACEBOOK', verbose_name='Plataforma')
    session = models.CharField(max_length=utils.MEDIUM_LENGTH, blank=True, null=True, verbose_name='Sessão')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True, related_name='messages', verbose_name='Cliente')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True, related_name='messages', verbose_name='Pedido')
    created_on = models.DateTimeField(auto_now_add=True, verbose_name='Data-Hora de Criação')
    updated_on = models.DateTimeField(auto_now=True, verbose_name='Data-Hora de Atualização')
    notify = models.BooleanField(default=False, verbose_name='Notifica')
    visualized = models.BooleanField(default=False, verbose_name='Visualizada')

    def __str__(self): return self.content
    
    def client_name(self):
        return self.client.name if self.client else None

    class Meta:
        verbose_name = 'Mensagem'
        verbose_name_plural = 'Mensagens'
        ordering = []
