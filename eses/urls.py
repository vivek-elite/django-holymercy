from django.urls import path
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.core.mail import EmailMessage
from core.forms import ContactForm
from core.utils import EMAIL_TEXT, ContactEmailThread
from core.models import Post, Sale
from django.contrib.auth import authenticate, login, logout 
from accounts.forms import LoginForm_eses, SignupForm_eses
from django.conf import settings
from django.contrib.auth.decorators import login_required
from paypal.standard.forms import PayPalPaymentsForm
import uuid
from django.urls import path, reverse

#def home_view(request):
    #return render(request,'eses/index.html')

def about_view(request): 
    return render(request,'eses/about-us.html')

def ebook_view(request): 
    return render(request,'eses/ebook.html')

def contact_view(request): 
    return render(request,'eses/contact-us.html')

def contact_submit(request):
    if request.POST:
      
        lang_contact = request.POST['lang']
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            email_subject = form.cleaned_data['subject']
            email_message = EMAIL_TEXT.format(
                form.cleaned_data['name'],
                form.cleaned_data['email'],
                form.cleaned_data['message']
        
            ) 
            email = EmailMessage(
                subject = email_subject,
                body = email_message,
                from_email = form.cleaned_data['email'],
                to=['support@holymercy.com']

            )
            ContactEmailThread(email).start()
            

        return redirect(lang_contact)
    return render(request,'eses/contact-us.html')

def guardian_view(request): 
    return render(request,'eses/guardian-angels.html')

def heavenly_view(request): 
    return render(request,'eses/heavenly-realms.html')

def living_view(request): 
    return render(request,'eses/living-light.html')

def powerful(request): 
    return render(request,'eses/powerful-scripture.html')

def prayer_view(request): 
    return render(request,'eses/prayer-request.html')

def share_view(request): 
    return render(request,'eses/share-the-faith.html')

def soldiers_view(request): 
    return render(request,'eses/soldiers-of-light.html')

def spiritual_view(request): 
    return render(request,'eses/spiritual-realms.html')

def terms_view(request): 
    return render(request,'eses/terms.html')

def the_view(request, slug): 
    slug = 'es-es-' + slug
    posts = Post.objects.filter(slug=slug)
    return render(request,'core/post_detail.html', {'post': posts[0]})

def unconditional_view(request): 
    return render(request,'eses/unconditional-love.html')

def error_404_view(request, exception):
    return render(request, 'eses/404.html', status=404)

def error_500_view(request):
    return render(request, 'eses/500.html', status=500)

#membership pages
@login_required(login_url='/es-es/login/')
def chapter1 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 1' in sales:
        return render(request,'eses/chapter1.html')
    else:
        return redirect('/eses/membership')
    
@login_required(login_url='/es-es/login/')
def chapter2 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 2' in sales:
        return render(request,'eses/chapter2.html')
    else:
        return redirect('/eses/membership')
    
@login_required(login_url='/es-es/login/')
def chapter3 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 3' in sales:
        return render(request,'eses/chapter3.html')
    else:
        return redirect('/eses/membership')
    
@login_required(login_url='/es-es/login/')
def chapter4 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 4' in sales:
        return render(request,'eses/chapter4.html')
    else:
        return redirect('/eses/membership')  

@login_required(login_url='/es-es/login/')
def chapter5 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 5' in sales:
        return render(request,'eses/chapter5.html')
    else:
        return redirect('/eses/membership')  

@login_required(login_url='/es-es/login/')
def chapter6 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 6' in sales:
        return render(request,'eses/chapter6.html')
    else:
        return redirect('/eses/membership')        

@login_required(login_url='/es-es/login/')
def chapter7 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 7' in sales:
        return render(request,'eses/chapter7.html')
    else:
        return redirect('/eses/membership')
    
@login_required(login_url='/es-es/login/')
def thecircleoflove (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'The Circle of Love' in sales:
        return render(request,'eses/thecircleoflove.html')
    else:
        return redirect('/eses/membership') 


#login / signup
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm_eses(request.POST)
        if form.is_valid():
            user = form.save()
    #        login(request, user)
            return redirect('eses-login')
    else:
        form = SignupForm_eses()
    return render(request, 'eses/signup.html', {'form': form})
    

def signin_view(request):
    if request.method == 'POST':
        form = LoginForm_eses(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)    
                return redirect('eses-membership')
    else:
        form = LoginForm_eses()
    
    return render(request, 'eses/login.html', {'form': form})


# logout page
def user_logout(request):
    logout(request)
    return redirect('/es-es/login')


@login_required(login_url='/eses/login/')
def membership(request):
    language = 'eses'
    # product = Product.objects.get(id=product_id)

    host = request.get_host()

    protocol = 'http://'
    #copy & paste 93 -106, change item name, & line 106 to chapter payment # 
    
    product_name = "Chapter 1"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment1 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "Chapter 2"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment2 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "Chapter 3"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment3 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "Chapter 4"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment4 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "Chapter 5"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment5 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "Chapter 6"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment6 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "Chapter 7"
    product_price = 7
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment7 = PayPalPaymentsForm(initial = paypal_checkout)

    product_name = "The Circle of Love"
    product_price = 40
    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': product_price,
        'item_name': product_name,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"{protocol}{host}{reverse('paypal-ipn')}",
        'return_url': f"{protocol}{host}{reverse('payment-success', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}",
        'cancel_url': f"{protocol}{host}{reverse('payment-failed', kwargs = {'product_name': product_name, 'product_price': product_price, 'language': language})}"
    }

    paypal_payment8 = PayPalPaymentsForm(initial = paypal_checkout)

    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)  

    context = {
        'paypal1': paypal_payment1,
        'paypal2': paypal_payment2,
        'paypal3': paypal_payment3,
        'paypal4': paypal_payment4,
        'paypal5': paypal_payment5,
        'paypal6': paypal_payment6,
        'paypal7': paypal_payment7,        
        'paypal8': paypal_payment8,
        'sales': sales
    }    
    return render(request,'eses/membership.html', context)


urlpatterns=[
    path('sitemap.xml', TemplateView.as_view(template_name='eses/sitemap.xml', content_type='application/xml')),
    #path('home/',home_view, name='eses'),
    path('about-us/', about_view, name='eses-about-us'),
    path('ebook/', ebook_view, name='eses-ebook'),
    path('contact-us/', contact_view, name='eses-contact-us'),
    path('contact-submit/', contact_submit, name='eses-contact-submit'),
    #path('guardian-angels/', guardian_view, name='eses-guardian-angels'),
    #path('heavenly-realms/', heavenly_view, name='eses-heavenly-realms'),
    #path('living-light/', living_view, name='eses-living-light'),
    path('powerful-scripture/', powerful, name='eses-powerful-scripture'),
    path('prayer-request/', prayer_view, name='eses-prayer-request'),
    path('share-the-faith/', share_view, name='eses-share-the-faith'),
    #path('soldiers-of-light/', soldiers_view, name='eses-soldiers-of-light'),
    #path('spiritual-realms/', spiritual_view, name='eses-spiritual-realms'),
    path('terms/', terms_view, name='eses-terms'),
    #path('the-vision/', the_view, name='eses/the-vision'),
    #path('unconditional-love/', unconditional_view, name='eses-unconditional-love'),
    path('membership/', membership, name='eses-membership'),
    path('chapter1/', chapter1, name='eses-chapter1'),
    path('chapter2/', chapter2, name='eses-chapter2'),
    path('chapter3/', chapter3, name='eses-chapter3'),
    path('chapter4/', chapter4, name='eses-chapter4'),
    path('chapter5/', chapter5, name='eses-chapter5'),
    path('chapter6/', chapter6, name='eses-chapter6'),
    path('chapter7/', chapter7, name='eses-chapter7'),
    path('thecircleoflove/', thecircleoflove, name='eses-thecircleoflove'),
    path("login/", signin_view, name="eses-login"),
    path("signup/", signup_view, name="eses-signup"),
    path('logout/', user_logout, name='eses-logout'),
    path('<str:slug>/', the_view, name='post_detail'),
]