# mysite/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render
#from accounts.views import signin_view, signup_view


def ar_home_view(request):
    return render(request,'ar/index.html')

def bn_home_view(request):
    return render(request,'bn/index.html')

def de_home_view(request):
    return render(request,'de/index.html')

def dede_home_view(request):
    return render(request,'dede/index.html')

def en_home_view(request):
    return render(request,'en/index.html')

def engb_home_view(request):
    return render(request,'engb/index.html')

def enin_home_view(request):
    return render(request,'enin/index.html')

def es_home_view(request):
    return render(request,'es/index.html')

def esar_home_view(request):
    return render(request,'esar/index.html')

def esco_home_view(request):
    return render(request,'esco/index.html')

def eses_home_view(request):
    return render(request,'eses/index.html')

def esmx_home_view(request):
    return render(request,'esmx/index.html')

def espe_home_view(request):
    return render(request,'espe/index.html')

def esve_home_view(request):
    return render(request,'esve/index.html')

def fr_home_view(request):
    return render(request,'fr/index.html')

def frca_home_view(request):
    return render(request,'frca/index.html')

def frfr_home_view(request):
    return render(request,'frfr/index.html')

def hi_home_view(request):
    return render(request,'hi/index.html')

def hiin_home_view(request):
    return render(request,'hiin/index.html')

def id_home_view(request):
    return render(request,'idid/index.html')

def jajp_home_view(request):
    return render(request,'jajp/index.html')

def ko_home_view(request):
    return render(request,'ko/index.html')

def pptt_home_view(request):
    return render(request,'pptt/index.html')

def pt_home_view(request):
    return render(request,'pt/index.html')

def ptbr_home_view(request):
    return render(request,'ptbr/index.html')

def ru_home_view(request):
    return render(request,'ru/index.html')

def ur_home_view(request):
    return render(request,'ur/index.html')

def zh_home_view(request):
    return render(request,'zh/index.html')

def zhhk_home_view(request):
    return render(request,'zhhk/index.html')

def zhsg_home_view(request):
    return render(request,'zhsg/index.html')

def zhtw_home_view(request):
    return render(request,'zhtw/index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('payments/', include('payments.urls')),
    path('payments/', include('paypal.standard.ipn.urls')),
    path('ar/',ar_home_view, name='ar'),
    path('bn/',bn_home_view, name='bn'),
    path('de/',de_home_view, name='de'),
    path('de-de/',dede_home_view, name='dede'),
    path('en/',en_home_view, name='en'),
    path('en-gb/',engb_home_view, name='engb'),
    path('en-in/',enin_home_view, name='enin'),
    path('es/',es_home_view, name='es'),
    path('es-ar/',esar_home_view, name='esar'),
    path('es-co/',esco_home_view, name='esco'),
    path('es-es/',eses_home_view, name='eses'),
    path('es-mx/',esmx_home_view, name='esmx'),
    path('es-pe/',espe_home_view, name='espe'),
    path('es-ve/',esve_home_view, name='esve'),
    path('fr/',fr_home_view, name='fr'),
    path('fr-ca/',frca_home_view, name='frca'),
    path('fr-fr/',frfr_home_view, name='frfr'),
    path('hi/',hi_home_view, name='hi'),
    path('hi-in/',hiin_home_view, name='hiin'),
    path('id-id/',id_home_view, name='idid'),
    path('ja-jp/',jajp_home_view, name='jajp'),
    path('ko/',ko_home_view, name='ko'),
    path('pt-pt/',pptt_home_view, name='pptt'),
    path('pt/',pt_home_view, name='pt'),
    path('pt-br/',ptbr_home_view, name='ptbr'),
    path('ru/',ru_home_view, name='ru'),
    path('ur/',ur_home_view, name='ur'),
    path('zh/',zh_home_view, name='zh'),
    path('zh-hk/',zhhk_home_view, name='zhhk'),
    path('zh-sg/',zhsg_home_view, name='zhsg'),
    path('zh-tw/',zhtw_home_view, name='zhtw'),
    
    
    

    path('', include('core.urls')),
   #path("payments/", include("payments.urls")),
    path("robots.txt", TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),),
    # languages
    path('ar/', include('ar.urls')),
    path('bn/', include('bn.urls')),
    path('de/', include('de.urls')),
    path('de-de/', include('dede.urls')),
    path('en/', include('en.urls')),
    path('en-gb/', include('engb.urls')),
    path('en-in/', include('enin.urls')),
    path('es/', include('es.urls')),
    path('es-es/', include('eses.urls')),
    path('es-ar/', include('esar.urls')),
    path('es-co/', include('esco.urls')),
    path('es-mx/', include('esmx.urls')),
    path('es-pe/', include('espe.urls')),
    path('es-ve/', include('esve.urls')),
    path('fr/', include('fr.urls')),
    path('fr-ca/', include('frca.urls')),
    path('fr-fr/', include('frfr.urls')),
    path('hi/', include('hi.urls')),
    path('hi-in/', include('hiin.urls')),
    path('id-id/', include('idid.urls')),
    path('ja-jp/', include('jajp.urls')),
    path('ko/', include('ko.urls')),
    path('pt/', include('pt.urls')),
    path('pt-br/', include('ptbr.urls')),
    path('pt-pt/', include('pptt.urls')),
    path('ru/', include('ru.urls')),
    path('ur/', include('ur.urls')),
    path('zh-hk/', include('zhhk.urls')),
    path('zh-sg/', include('zhsg.urls')),
    path('zh-tw/', include('zhtw.urls')),
    path('zh/', include('zh.urls')),


]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
