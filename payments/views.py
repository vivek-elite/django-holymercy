from django.shortcuts import render
from paypal.standard.forms import PayPalPaymentsForm
from django.conf import settings
from django.urls import reverse
import uuid
from core.models import Sale
from datetime import date


def PaymentSuccessful(request, product_name, product_price, language=''):
    sale = Sale.objects.create(
        sale_date = date.today(),
        user_id = request.user.id,
        product = product_name,
        price = product_price        
    )
    if language=='core':
        return render(request, f"payments/success.html", {'product_name': product_name, 'product_price': product_price})
    else:
        return render(request, f"payments/{language}/success.html", {'product_name': product_name, 'product_price': product_price})


def PaymentFailed(request, product_name, product_price, language=''):
    if language=='core':
        return render(request, f"payments/cancel.html", {'product_name': product_name, 'product_price': product_price})
    else:    
        return render(request, f"payments/{language}/cancel.html", {'product_name': product_name, 'product_price': product_price})