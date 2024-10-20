from django.urls import path
from . import views

urlpatterns = [
    path('payment-success/<str:product_name>/<int:product_price>/<str:language>', views.PaymentSuccessful, name='payment-success'),
    path('payment-failed/<str:product_name>/<int:product_price>/<str:language>', views.PaymentFailed, name='payment-failed'),
]