from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

from api import views

urlpatterns = [
    # url(r'auth/$', obtain_auth_token, name='api-auth'),
    url(r'^webhook/?$', views.WebhookView.as_view(), name='api-webhook'),

    url(r'^products/?$', views.ProductList.as_view(), name='api-product-list'),
    url(r'^products/(?P<pk>[0-9]+)/?$', views.ProductDetail.as_view(), name='api-product-detail'),
    url(r'^orders/?$', views.OrderList.as_view(), name='api-order-list'),
    url(r'^orders/(?P<pk>[0-9]+)/?$', views.OrderDetail.as_view(), name='api-order-detail'),
    url(r'^clients/?$', views.ClientList.as_view(), name='api-client-list'),
    url(r'^clients/(?P<pk>[0-9]+)/?$', views.ClientDetail.as_view(), name='api-client-detail'),
    url(r'^messages/?$', views.MessageList.as_view(), name='api-message-list'),
    url(r'^messages/(?P<pk>[0-9]+)/?$', views.MessageDetail.as_view(), name='api-message-detail'),
    url(r'^messages/notifications/?$', views.MessageNotificationList.as_view(), name='api-message-notification-list'),
]
