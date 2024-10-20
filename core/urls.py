from django.conf import settings
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from django.core.mail import EmailMessage
from django.shortcuts import render, redirect
from django.urls import path, reverse
from django.views.generic import DetailView, TemplateView
from requests import request

from .models import Post, Sale
from .utils import EMAIL_TEXT, ContactEmailThread
from .forms import ContactForm
from accounts.forms import LoginForm_core, SignupForm_core
from paypal.standard.forms import PayPalPaymentsForm
import uuid


def home_view(request):
    return render(request,'core/index.html')


def about(request):
    return render(request,'core/about-us.html')


def ebook(request):
    return render(request,'core/ebook.html')


def guardian(request):
    return render(request,'core/guardian-angels.html')


def heavenly(request):
    return render(request,'core/heavenly-realms.html')


def living(request):
    return render(request,'core/living-light.html')


def powerful(request):
    return render(request,'core/powerful-scripture.html')


def prayer(request):
    return render(request,'core/prayer-request.html')


def share(request):
    return render(request,'core/share-the-faith.html')


def soldiers(request):
    return render(request,'core/soldiers-of-light.html')


def spiritual(request):
    return render(request,'core/spiritual-realms.html')


def terms(request):
    return render(request,'core/terms.html')


def the_vision(request):
    return render(request,'core/the-vision.html')


def unconditional(request):
    return render(request,'core/unconditional-love.html')


def gallery_view(request):
    return render(request, "core/gallery.html")


def books_view(request):
    return render(request, "core/books.html")


def contact(request):
    form = ContactForm()
    return render(request,'core/contact-us.html', {'form': form})


@login_required(login_url='/login/')
def membership(request):
    language = 'core'

    settings.PAYPAL_BUY_BUTTON_IMAGE = 'https://holymercy.com/img/buy-nowx.webp'
    # product = Product.objects.get(id=product_id)

    host = request.get_host()
    # After production change to 'https://'
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
    return render(request,'core/membership.html', context)


#membership pages
@login_required(login_url='/login/')
def chapter1 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 1' in sales:
        return render(request,'core/chapter1.html')
    else:
        return redirect('membership')
    
@login_required(login_url='/login/')
def chapter2 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 2' in sales:
        return render(request,'core/chapter2.html')
    else:
        return redirect('membership')
    
@login_required(login_url='/login/')
def chapter3 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 3' in sales:
        return render(request,'core/chapter3.html')
    else:
        return redirect('membership')
    
@login_required(login_url='/login/')
def chapter4 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 4' in sales:
        return render(request,'core/chapter4.html')
    else:
        return redirect('membership')  

@login_required(login_url='/login/')
def chapter5 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 5' in sales:
        return render(request,'core/chapter5.html')
    else:
        return redirect('membership')  

@login_required(login_url='/login/')
def chapter6 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 6' in sales:
        return render(request,'core/chapter6.html')
    else:
        return redirect('membership')        

@login_required(login_url='/login/')
def chapter7 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 7' in sales:
        return render(request,'core/chapter7.html')
    else:
        return redirect('membership')
    
@login_required(login_url='/login/')
def thecircleoflove (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'The Circle of Love' in sales:
        return render(request,'core/thecircleoflove.html')
    else:
        return redirect('membership')    

#login / signup
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm_core(request.POST)
        if form.is_valid():
            user = form.save()
    #        login(request, user)
            return redirect('login')
    else:
        form = SignupForm_core()
    return render(request, 'accounts/signup.html', {'form': form})
    

def signin_view(request):
    if request.method == 'POST':
        form = LoginForm_core(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)    
                return redirect('membership')
    else:
        form = LoginForm_core()
    
    return render(request, 'accounts/login.html', {'form': form})


# logout page
def user_logout(request):
    logout(request)
    return redirect('login')


#email
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
    return render(request,'contact-us.html')


def premium_features_view(request):
    return render(request, "core/premium_features.html")


#posts
class PostDetail(DetailView):
    model = Post
    print("hello there")
    template_name = 'core/post_detail.html'


def error_404_view(request, exception):
    return render(request, '404.html', status=404)


def error_500_view(request):
    return render(request, '500.html', status=500)


urlpatterns = [
    path('sitemap.xml', TemplateView.as_view(template_name='core/sitemap.xml', content_type='application/xml')),
    path('video-sitemap.xml', TemplateView.as_view(template_name='core/video-sitemap.xml', content_type='application/xml')),
    path('BingSiteAuth.xml', TemplateView.as_view(template_name='BingSiteAuth.xml', content_type='application/xml')),
    path('googleb47509ccafd91dd2.html', TemplateView.as_view(template_name='googleb47509ccafd91dd2.html',)),
    path('README.md', TemplateView.as_view(template_name='README.md',)),
    path('sitechecker4ec508b8ac8e538f0f31ae5d7e5fb028.html', TemplateView.as_view(template_name='sitechecker4ec508b8ac8e538f0f31ae5d7e5fb028.html',)),
    path('sitechecker74b9b4c5c8e9b96918b9a2f31a3410cb.html', TemplateView.as_view(template_name='sitechecker74b9b4c5c8e9b96918b9a2f31a3410cb.html',)),
    path('ahrefs_ae6a0c99b2259e552a218a12460538d066cb1590eb76f7e2e3d5fde361454f20', TemplateView.as_view(template_name='ahrefs_ae6a0c99b2259e552a218a12460538d066cb1590eb76f7e2e3d5fde361454f20',)),
    path('', home_view, name='home'),
    #path("books/", books_view, name="books"),
    #path("gallery/", gallery_view, name="gallery"),
    #path("premium/", premium_features_view, name="premium-features"),
    path('about-us/', about, name='about-us'),
    path('ebook/', ebook, name='ebook'),
    path('contact-us/', contact, name='contact-us'),
    path('contact-submit/', contact_submit, name='contact-submit'),
    #path('the-vision/', the_vision, name='the-vision'),
    #@path('guardian-angels/', guardian, name='guardian-angels'),
    #path('heavenly-realms/', heavenly, name='heavenly-realms'),
    #path('living-light/', living, name='living-light'),
    path('powerful-scripture/', powerful, name='powerful-scripture'),
    path('prayer-request/', prayer, name='prayer-request'),
    path('share-the-faith/', share, name='share-the-faith'),
    #path('soldiers-of-light/', soldiers, name='soldiers-of-light'),
    #path('spiritual-realms/', spiritual, name='spiritual-realms'),
    path('terms/', terms, name='terms'),
    path('membership/', membership, name='membership'),
    path('chapter1/', chapter1, name='chapter1'),
    path('chapter2/', chapter2, name='chapter2'),
    path('chapter3/', chapter3, name='chapter3'),
    path('chapter4/', chapter4, name='chapter4'),
    path('chapter5/', chapter5, name='chapter5'),
    path('chapter6/', chapter6, name='chapter6'),
    path('chapter7/', chapter7, name='chapter7'),
    path('thecircleoflove/', thecircleoflove, name='thecircleoflove'),
    path("login/", signin_view, name="login"),
    path("signup/", signup_view, name="signup"),
    path('logout/', user_logout, name='logout'),
    #path('unconditional-love/', unconditional, name='unconditional-love'),
    path('<slug:slug>/', PostDetail.as_view(), name='post_detail'),
]