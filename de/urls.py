from django.urls import path
from django.shortcuts import render, redirect
from django.views.generic import DetailView, TemplateView
from django.core.mail import EmailMessage
from core.forms import ContactForm
from core.utils import EMAIL_TEXT, ContactEmailThread
from core.models import Post, Sale
from django.contrib.auth import authenticate, login, logout 
from accounts.forms import LoginForm_de, SignupForm_de
from django.conf import settings
from django.contrib.auth.decorators import login_required
from paypal.standard.forms import PayPalPaymentsForm
import uuid
from django.urls import path, reverse

#def home_view(request):
    #return render(request,'de/index.html')

def about_view(request): 
    return render(request,'de/about-us.html')

def ebook_view(request): 
    return render(request,'de/ebook.html')

def contact_view(request): 
    return render(request,'de/contact-us.html')

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
    return render(request,'de/contact-us.html')

def guardian_view(request): 
    return render(request,'de/guardian-angels.html')

def heavenly_view(request): 
    return render(request,'de/heavenly-realms.html')

def living_view(request): 
    return render(request,'de/living-light.html')

def powerful(request): 
    return render(request,'de/powerful-scripture.html')

def prayer_view(request): 
    return render(request,'de/prayer-request.html')

def share_view(request): 
    return render(request,'de/share-the-faith.html')

def soldiers_view(request): 
    return render(request,'de/soldiers-of-light.html')

def spiritual_view(request): 
    return render(request,'de/spiritual-realms.html')

def terms_view(request): 
    return render(request,'de/terms.html')

def the_view(request, slug): 
    slug = 'de-' + slug
    posts = Post.objects.filter(slug=slug)
    return render(request,'core/post_detail.html', {'post': posts[0]})

def unconditional_view(request): 
    return render(request,'de/unconditional-love.html')

def error_404_view(request, exception):
    return render(request, 'de/404.html', status=404)

def error_500_view(request):
    return render(request, 'de/500.html', status=500)

#membership pages
@login_required(login_url='/de/login/')
def chapter1 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 1' in sales:
        return render(request,'de/chapter1.html')
    else:
        return redirect('/de/membership')
    
@login_required(login_url='/de/login/')
def chapter2 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 2' in sales:
        return render(request,'de/chapter2.html')
    else:
        return redirect('/de/membership')
    
@login_required(login_url='/de/login/')
def chapter3 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 3' in sales:
        return render(request,'de/chapter3.html')
    else:
        return redirect('/de/membership')
    
@login_required(login_url='/de/login/')
def chapter4 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 4' in sales:
        return render(request,'de/chapter4.html')
    else:
        return redirect('/de/membership')  

@login_required(login_url='/de/login/')
def chapter5 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 5' in sales:
        return render(request,'de/chapter5.html')
    else:
        return redirect('/de/membership')  

@login_required(login_url='/de/login/')
def chapter6 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 6' in sales:
        return render(request,'de/chapter6.html')
    else:
        return redirect('/de/membership')        

@login_required(login_url='/de/login/')
def chapter7 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 7' in sales:
        return render(request,'de/chapter7.html')
    else:
        return redirect('/de/membership')
    
@login_required(login_url='/de/login/')
def thecircleoflove (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'The Circle of Love' in sales:
        return render(request,'de/thecircleoflove.html')
    else:
        return redirect('/de/membership')


#login / signup
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm_de(request.POST)
        if form.is_valid():
            user = form.save()
    #        login(request, user)
            return redirect('de-login')
    else:
        form = SignupForm_de()
    return render(request, 'de/signup.html', {'form': form})
    

def signin_view(request):
    if request.method == 'POST':
        form = LoginForm_de(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)    
                return redirect('de-membership')
    else:
        form = LoginForm_de()
    
    return render(request, 'de/login.html', {'form': form})


# logout page
def user_logout(request):
    logout(request)
    return redirect('/de/login')


@login_required(login_url='/de/login/')
def membership(request):
    language = 'de'
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
    return render(request,'de/membership.html', context)


urlpatterns=[
    path('sitemap.xml', TemplateView.as_view(template_name='de/sitemap.xml', content_type='application/xml')),
    #path('home/',home_view, name='de'),
    path('about-us/', about_view, name='de-about-us'),
    path('ebook/', ebook_view, name='de-ebook'),
    path('contact-us/', contact_view, name='de-contact-us'),
    path('contact-submit/', contact_submit, name='de-contact-submit'),
    #path('guardian-angels/', guardian_view, name='de-guardian-angels'),
    #path('heavenly-realms/', heavenly_view, name='de-heavenly-realms'),
    #path('living-light/', living_view, name='de-living-light'),
    path('powerful-scripture/', powerful, name='de-powerful-scripture'),
    path('prayer-request/', prayer_view, name='de-prayer-request'),
    path('share-the-faith/', share_view, name='de-share-the-faith'),
    #path('soldiers-of-light/', soldiers_view, name='de-soldiers-of-light'),
    #path('spiritual-realms/', spiritual_view, name='de-spiritual-realms'),
    path('terms/', terms_view, name='de-terms'),
    #path('the-vision/', the_view, name='de/the-vision'),
    #path('unconditional-love/', unconditional_view, name='de-unconditional-love'),
    path('membership/', membership, name='de-membership'),
    path('chapter1/', chapter1, name='de-chapter1'),
    path('chapter2/', chapter2, name='de-chapter2'),
    path('chapter3/', chapter3, name='de-chapter3'),
    path('chapter4/', chapter4, name='de-chapter4'),
    path('chapter5/', chapter5, name='de-chapter5'),
    path('chapter6/', chapter6, name='de-chapter6'),
    path('chapter7/', chapter7, name='de-chapter7'),
    path('thecircleoflove/', thecircleoflove, name='de-thecircleoflove'),
    path("login/", signin_view, name="de-login"),
    path("signup/", signup_view, name="de-signup"),
    path('logout/', user_logout, name='de-logout'),
    path('<str:slug>/', the_view, name='post_detail'),
]