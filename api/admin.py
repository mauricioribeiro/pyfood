from django.contrib import admin

# Register your models here.
from api.models import Order, Client

admin.site.register(Client)
admin.site.register(Order)
