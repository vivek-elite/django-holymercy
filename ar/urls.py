from django.urls import path
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.core.mail import EmailMessage
from core.forms import ContactForm
from core.utils import EMAIL_TEXT, ContactEmailThread
from core.models import Post, Sale
from django.contrib.auth import authenticate, login, logout 
from accounts.forms import LoginForm_ar, SignupForm_ar
from django.conf import settings
from django.contrib.auth.decorators import login_required
from paypal.standard.forms import PayPalPaymentsForm
import uuid
from django.urls import path, reverse


#def home_view(request):
    #return render(request,'ar/index.html')

def about_view(request): 
    return render(request,'ar/about-us.html')

def ebook_view(request): 
    return render(request,'ar/ebook.html')

def contact_view(request): 
    return render(request,'ar/contact-us.html')

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
    return render(request,'ar/contact-us.html')


def guardian_view(request): 
    return render(request,'ar/guardian-angels.html')

def heavenly_view(request): 
    return render(request,'ar/heavenly-realms.html')

def living_view(request): 
    return render(request,'ar/living-light.html')

def powerful(request): 
    return render(request,'ar/powerful-scripture.html')

def prayer_view(request): 
    return render(request,'ar/prayer-request.html')

def share_view(request): 
    return render(request,'ar/share-the-faith.html')

def soldiers_view(request): 
    return render(request,'ar/soldiers-of-light.html')

def spiritual_view(request): 
    return render(request,'ar/spiritual-realms.html')

def terms_view(request): 
    return render(request,'ar/terms.html')

def the_view(request, slug): 
    slug = 'ar-' + slug
    posts = Post.objects.filter(slug=slug)
    return render(request,'core/post_detail.html', {'post': posts[0]})

def unconditional_view(request): 
    return render(request,'ar/unconditional-love.html')

def error_404_view(request, exception):
    return render(request, 'ar/404.html', status=404)

def error_500_view(request):
    return render(request, 'ar/500.html', status=500)

#membership pages
@login_required(login_url='/ar/login/')
def chapter1 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 1' in sales:
        return render(request,'ar/chapter1.html')
    else:
        return redirect('/ar/membership')
    
@login_required(login_url='/ar/login/')
def chapter2 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 2' in sales:
        return render(request,'ar/chapter2.html')
    else:
        return redirect('/ar/membership')
    
@login_required(login_url='/ar/login/')
def chapter3 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 3' in sales:
        return render(request,'ar/chapter3.html')
    else:
        return redirect('/ar/membership')
    
@login_required(login_url='/ar/login/')
def chapter4 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 4' in sales:
        return render(request,'ar/chapter4.html')
    else:
        return redirect('/ar/membership')  

@login_required(login_url='/ar/login/')
def chapter5 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 5' in sales:
        return render(request,'ar/chapter5.html')
    else:
        return redirect('/ar/membership')  

@login_required(login_url='/ar/login/')
def chapter6 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 6' in sales:
        return render(request,'ar/chapter6.html')
    else:
        return redirect('/ar/membership')        

@login_required(login_url='/ar/login/')
def chapter7 (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'Chapter 7' in sales:
        return render(request,'ar/chapter7.html')
    else:
        return redirect('/ar/membership')
    
@login_required(login_url='/ar/login/')
def thecircleoflove (request):
    sales = Sale.objects.filter(user_id=request.user.id).values_list('product', flat=True)
    if 'The Circle of Love' in sales:
        return render(request,'ar/thecircleoflove.html')
    else:
        return redirect('/ar/membership')  

#login / signup
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm_ar(request.POST)
        if form.is_valid():
            user = form.save()
    #        login(request, user)
            return redirect('ar-login')
    else:
        form = SignupForm_ar()
    return render(request, 'ar/signup.html', {'form': form})
    

def signin_view(request):
    if request.method == 'POST':
        form = LoginForm_ar(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)    
                return redirect('ar-membership')
    else:
        form = LoginForm_ar()
    
    return render(request, 'ar/login.html', {'form': form})


# logout page
def user_logout(request):
    logout(request)
    return redirect('/ar/login')


@login_required(login_url='/ar/login/')
def membership(request):
    language = 'ar'
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
    return render(request,'ar/membership.html', context)



urlpatterns=[
    path('sitemap.xml', TemplateView.as_view(template_name='ar/sitemap.xml', content_type='application/xml')),
    #path('home/',home_view, name='es'),
    path('about-us/', about_view, name='ar-about-us'),
    path('ebook/', ebook_view, name='ar-ebook'),
    path('contact-us/', contact_view, name='ar-contact-us'),
    path('contact-submit/', contact_submit, name='ar-contact-submit'),
    #path('guardian-angels/', guardian_view, name='ar-guardian-angels'),
    #path('heavenly-realms/', heavenly_view, name='ar-heavenly-realms'),
    #path('living-light/', living_view, name='ar-living-light'),
    path('powerful-scripture/', powerful, name='ar-powerful-scripture'),
    path('prayer-request/', prayer_view, name='ar-prayer-request'),
    path('share-the-faith/', share_view, name='ar-share-the-faith'),
    #path('soldiers-of-light/', soldiers_view, name='ar-soldiers-of-light'),
    #path('spiritual-realms/', spiritual_view, name='ar-spiritual-realms'),
    path('terms/', terms_view, name='ar-terms'),
    #path('the-vision/', the_view, name='ar/the-vision'),
    #path('unconditional-love/', unconditional_view, name='ar-unconditional-love'),
    path('membership/', membership, name='ar-membership'),
    path('chapter1/', chapter1, name='ar-chapter1'),
    path('chapter2/', chapter2, name='ar-chapter2'),
    path('chapter3/', chapter3, name='ar-chapter3'),
    path('chapter4/', chapter4, name='ar-chapter4'),
    path('chapter5/', chapter5, name='ar-chapter5'),
    path('chapter6/', chapter6, name='ar-chapter6'),
    path('chapter7/', chapter7, name='ar-chapter7'),
    path('thecircleoflove/', thecircleoflove, name='ar-thecircleoflove'),
    path("login/", signin_view, name="ar-login"),
    path("signup/", signup_view, name="ar-signup"),
    path('logout/', user_logout, name='ar-logout'),
    path('<str:slug>/', the_view, name='post_detail'),
 
]