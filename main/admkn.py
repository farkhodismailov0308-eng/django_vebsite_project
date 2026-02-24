from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_date', 'views_count', 'published')
    list_filter = ('published', 'created_date')
    search_fields = ('title', 'content')
    readonly_fields = ('views_count', 'created_date', 'updated_date')
    fieldsets = (
        ('Asosiy maʼlumotlar', {
            'fields': ('title', 'content', 'image')
        }),
        ('Aloqa maʼlumotlari', {
            'fields': ('location', 'phone')
        }),
        ('Holat', {
            'fields': ('published', 'views_count', 'created_date', 'updated_date')
        }),
    )
