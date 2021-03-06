from django.core.validators import MinValueValidator
from django.db import models

SMALL_LENGTH = 25
MEDIUM_LENGTH = 100
LARGE_LENGTH = 250

OPENED = 'OPENED'
PROCESSED = 'PROCESSED'
SENT = 'SENT'
DELIVERED = 'DELIVERED'
CANCELED = 'CANCELED'

ORDER_STATUSES = (
    (OPENED, 'Aberto'),
    (PROCESSED, 'Processado'),
    (SENT, 'Enviado'),
    (DELIVERED, 'Entregue'),
    (CANCELED, 'Cancelado')
)

SOURCES = (
    ('FACEBOOK', 'Facebook'),
    ('EMBED', 'Web')
)

PRODUCT_CATEGORIES = (
    ('FOOD', 'Lanche'),
    ('DRINK', 'Bebida'),
    ('OTHER', 'Outro'),
)

# Webhook actions
ORDER_CREATE = 'order.create'
ORDER_ADD_ITEM = 'order.add_item'
ORDER_REMOVE_ITEM = 'order.remove_item'
ORDER_LIST_ITEMS = 'order.list_items'
ORDER_FINISH = 'order.finish'
ORDER_CONFIRM = 'order.confirm'

# Notification actions
NOTIFICATION_ACTIONS = [ORDER_CREATE, ORDER_ADD_ITEM, ORDER_REMOVE_ITEM, ORDER_FINISH]

# Webhook contexts
GENERIC_CONTEXT = 'generic'
FINISH_CONTEXT = 'finalizar'
ASKING_CONTEXT = 'montagem'


class MoneyField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = SMALL_LENGTH
        kwargs['validators'] = [MinValueValidator(0)]
        kwargs['decimal_places'] = 2
        kwargs['default'] = 0
        super(MoneyField, self).__init__(*args, **kwargs)
