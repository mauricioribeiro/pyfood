from django.contrib import admin

# Register your models here.
from api.models import *

admin.site.register(Client)
admin.site.register(Order)
admin.site.register(Product)
admin.site.register(Message)
