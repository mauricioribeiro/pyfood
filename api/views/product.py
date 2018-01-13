from api import models
from api.serializers.product import ProductSerializer
from rest_framework import generics


class ProductView:
    model = models.Product
    queryset = models.Product.objects.all()
    serializer_class = ProductSerializer
    view_name = 'product'


class ProductList(ProductView, generics.ListCreateAPIView):
    pass


class ProductDetail(ProductView, generics.RetrieveUpdateDestroyAPIView):
    pass

