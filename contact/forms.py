from django.forms import ModelForm
from .models import ContactMessage
from django_recaptcha.fields import ReCaptchaField



class ContactForm(ModelForm):

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message', 'recaptcha']
        

    def save(self,*args,**kwargs):
        super().save(*args,**kwargs)
 

