from django.utils.translation import gettext_lazy as _

from pathlib import Path
from dotenv import load_dotenv  #pip install python-dotenv

import os

load_dotenv()  # take environment variables from .env.

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ahh-9dkbtbm^-x^**+&gmtf0-n$qbdppism$e8ln8-e2i0w0n&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

SITE_ID = 1 #12-28-23


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites', #12-19 from tutorial 
    'django.contrib.sitemaps',   #12-19 from tutorial
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',
    'contact',
    'accounts',
    'payments',
    'paypal.standard.ipn',
    'django_recaptcha',
  
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'core/templates',
            BASE_DIR / 'accounts/templates',
            BASE_DIR / 'templates',
            BASE_DIR / 'ar/templates',
            BASE_DIR / 'bn/templates',
            BASE_DIR / 'de/templates',
            BASE_DIR / 'dede/templates',
            BASE_DIR / 'en/templates',
            BASE_DIR / 'engb/templates',
            BASE_DIR / 'enin/templates',
            BASE_DIR / 'es/templates',
            BASE_DIR / 'esar/templates',
            BASE_DIR / 'esco/templates',
            BASE_DIR / 'eses/templates',
            BASE_DIR / 'esmx/templates',
            BASE_DIR / 'espe/templates',
            BASE_DIR / 'esve/templates',
            BASE_DIR / 'fr/templates',
            BASE_DIR / 'frca/templates',
            BASE_DIR / 'frfr/templates',
            BASE_DIR / 'hi/templates',
            BASE_DIR / 'hiin/templates',
            BASE_DIR / 'jajp/templates',
            BASE_DIR / 'ko/templates',
            BASE_DIR / 'pptt/templates',
            BASE_DIR / 'pt/templates',
            BASE_DIR / 'ptbr/templates',
            BASE_DIR / 'ru/templates',
            BASE_DIR / 'ur/templates',
            BASE_DIR / 'zh/templates',
            BASE_DIR / 'zhhk/templates',
            BASE_DIR / 'zhsg/templates',
            BASE_DIR / 'zhtw/templates',
            BASE_DIR / 'idid/templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#404 redirect
handler404 = 'mysite.urls.error_404_view'
handler500 = 'mysite.urls.error_500_view'


WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'holymercy',
        'USER': 'root',
        'PASSWORD': 'admin',     # holymercy   
        'HOST': 'localhost',   
        'PORT': '3306',
    }    
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

LANGUAGES = (
    ('ar', _('Arabic')),
    ('bn', _('Bengali')),
    ('en', _('English')),
    ('fr', _('French')),
    ('es', _('Spanish')),
    ('de', _('German')),
    ('hi', _('Hindi')),
    ('id', _('Indonesian')),
    ('ja', _('Japanese')),
    ('ko', _('Korean')),
    ('pt', _('Portuguese')),
    ('ru', _('Russian')),
    ('ur', _('Urdu')),
    ('zh', _('Chinese (Simplified)')),
)


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtpout.secureserver.net'
EMAIL_USE_TLS = False
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = "support@holymercy.com"
EMAIL_HOST_PASSWORD = "6*c9hj!Y3"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static'
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

PAYPAL_RECEIVER_EMAIL = 'sb-ncqm129884361@business.example.com'
PAYPAL_TEST = True

PAYPAL_BUY_BUTTON_IMAGE = 'https://holymercy.com/img/buy-now.webp'
 
RECAPTCHA_PUBLIC_KEY = '6LcNGw4qAAAAADeOXiP4QE_NYow1-JjjJYoH7eAI'

RECAPTCHA_PRIVATE_KEY = '6LcNGw4qAAAAAL5aNiIZyj66CRGYvmncnlxHwkBs'

RECAPTCHA_REQUIRED_SCORE = .8