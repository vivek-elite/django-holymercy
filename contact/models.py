from django.db import models
from django_recaptcha.fields import ReCaptchaField

# Create your models here.
class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField(max_length=5000)
    recaptcha = ReCaptchaField()

    def __str__(self):
        return self.subject
