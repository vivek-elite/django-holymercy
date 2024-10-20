# core/models.py

from django.db import models
from django.contrib.auth.models import User
# from django_recaptcha.fields import ReCaptchaField

STATUS = (
    (0, "Draft"),
    (1, "Published")
)


class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default='Joseph', related_name='blog_posts')
    chapter_number = models.IntegerField(default=1)
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    language = models.CharField(max_length=20)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['chapter_number']

    def __str__(self):
        return self.title
    

class Sale(models.Model):
    id = models.AutoField(primary_key=True)
    sale_date = models.DateTimeField(auto_now=True)
    user_id = models.IntegerField()
    product = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.sale_date


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField(max_length=5000)
    # recaptcha = ReCaptchaField(label='')
  

    def __str__(self):
        return self.subject
    

class ContactMessage_es(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField(max_length=5000)
    # recaptcha = ReCaptchaField(label='')

    def __str__(self):
        return self.subject
    
    #, help_text="Spanish name"