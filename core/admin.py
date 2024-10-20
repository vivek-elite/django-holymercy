from django.contrib import admin
from .models import Post

from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'language', 'status','created_on', 'updated_on')
    list_filter = ('status', 'language')
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Post, PostAdmin)
