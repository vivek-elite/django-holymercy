from django.forms import ModelForm
from .models import ContactMessage, ContactMessage_es
from django_recaptcha.fields import ReCaptchaField


class ContactForm(ModelForm):
    recaptcha = ReCaptchaField(label='')

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message', 'recaptcha']

    def save(self,*args,**kwargs):
        super().save(*args,**kwargs)


class ContactForm_es(ModelForm):
    recaptcha = ReCaptchaField(label='')
    recaptcha.widget.api_params["hl"] = "es"

    class Meta:
        model = ContactMessage_es
        fields = ['name', 'email', 'subject', 'message', 'recaptcha']

    def save(self,*args,**kwargs):
        super().save(*args,**kwargs)    