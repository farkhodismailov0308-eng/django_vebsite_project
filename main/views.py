from django.shortcuts import render
from django.core.paginator import Paginator
from django.utils import timezone
from .models import Article

def index(request):
    # Barcha maqolalarni olish
    articles_list = Article.objects.filter(published=True).order_by('-created_date')
    
    # Pagination - har sahifada 3 tadan maqola
    paginator = Paginator(articles_list, 3)
    
    # So'ralgan sahifa raqamini olish (default: 1)
    page_number = request.GET.get('page', 1)
    
    # Sahifadagi maqolalarni olish
    page_obj = paginator.get_page(page_number)
    
    # Statistik ma'lumotlar
    total_articles = Article.objects.count()
    
    context = {
        'page_obj': page_obj,
        'articles': page_obj,
        'total_articles': total_articles,
        'current_time': timezone.now()
    }
    return render(request, 'main/index.html', context)

# MUHIM: Bu qator hech qanday probel bilan boshlanmasligi kerak!
def about(request):
    return render(request, 'main/about.html', {'title': 'Haqida'})
