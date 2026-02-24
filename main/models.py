from django.db import models
from django.utils import timezone
from django.urls import reverse

class Article(models.Model):
    title = models.CharField(
        max_length=200, 
        verbose_name='Sarlavha'
    )
    location = models.CharField(
        max_length=100, 
        verbose_name='Manzil',
        blank=True,  # Bo'sh qoldirish mumkin
        null=True    # Bazada NULL bo'lishi mumkin
    )
    phone = models.CharField(
        max_length=20, 
        verbose_name='Telefon',
        blank=True,
        null=True
    )
    content = models.TextField(
        verbose_name='Matn'
    )
    created_date = models.DateTimeField(
        default=timezone.now,
        verbose_name='Yaratilgan vaqt'
    )
    published = models.BooleanField(
        default=True, 
        verbose_name='Saytda ko\'rsatish'
    )
    views_count = models.IntegerField(
        default=0, 
        verbose_name="Ko'rishlar soni"
    )
    
    # QO'SHIMCHA MAYDONLAR (foydali bo'lishi mumkin)
    updated_date = models.DateTimeField(
        auto_now=True,  # Har safar saqlaganda yangilanadi
        verbose_name='O\'zgartirilgan vaqt'
    )
    image = models.ImageField(
        upload_to='articles/',  # 'media/articles/' papkasiga yuklanadi
        verbose_name='Rasm',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Maqola'
        verbose_name_plural = 'Maqolalar'
        ordering = ['-created_date']  # Eng yangi birinchi

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        """Maqolaning batafsil sahifasiga URL qaytaradi"""
        return reverse('article_detail', args=[str(self.id)])

    def time_since_created(self):
        """Necha vaqt oldin yozilganini ko'rsatadi"""
        from django.utils.timesince import timesince
        return timesince(self.created_date)

    def increment_views(self):
        """Ko'rishlar sonini oshirish uchun metod"""
        self.views_count += 1
        self.save(update_fields=['views_count'])
