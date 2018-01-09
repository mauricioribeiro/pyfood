from django.core.validators import MinValueValidator
from django.db import models

SMALL_LENGTH = 25
MEDIUM_LENGTH = 100
LARGE_LENGTH = 250

ORDER_STATUSES = (
    ('OPENED', 'Aberto'),
    ('PROCESSED', 'Processado'),
    ('SENT', 'Enviado'),
    ('DELIVERED', 'Entregue'),
    ('CANCELED', 'Cancelado')
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

class MoneyField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = SMALL_LENGTH
        kwargs['validators'] = [MinValueValidator(0)]
        kwargs['decimal_places'] = 2
        kwargs['default'] = 0
        super(MoneyField, self).__init__(*args, **kwargs)
