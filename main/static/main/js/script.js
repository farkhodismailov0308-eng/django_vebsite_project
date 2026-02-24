// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Sayt muvaffaqiyatli yuklandi!');
    
    // Scroll to top button
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Batafsil o'qish tugmalari
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            
            // Loading effekti
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Yuklanmoqda...';
            
            setTimeout(() => {
                alert(`"${title}" maqolasi yuklandi!`);
                this.innerHTML = '<span>Batafsil o'qish</span><i class="fas fa-arrow-right ms-2"></i>';
            }, 1000);
        });
    });
    
    // Newsletter form
    const newsletterBtn = document.querySelector('.newsletter-section .btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = document.querySelector('.newsletter-section input').value;
            if (email) {
                alert(`✅ ${email} muvaffaqiyatli obuna bo'ldi!`);
                document.querySelector('.newsletter-section input').value = '';
            } else {
                alert('❌ Iltimos, email kiriting!');
            }
        });
    }
    
    // Statistikalar animatsiyasi
    const statCards = document.querySelectorAll('.stat-card h2');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Statistikalar ko'rinadigan bo'lganda animatsiya
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('h2');
                numbers.forEach(num => {
                    const targetValue = parseInt(num.textContent.replace(/[^0-9]/g, ''));
                    if (targetValue && !num.classList.contains('animated')) {
                        num.classList.add('animated');
                        animateValue(num, 0, targetValue, 2000);
                    }
                });
            }
        });
    });
    
    statCards.forEach(card => {
        observer.observe(card.closest('.stat-card'));
    });
    
    // Card hover effekti
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#ffffff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

// Service Worker (offline support)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
        console.log('Service Worker registered:', reg);
    }).catch(err => {
        console.log('Service Worker error:', err);
    });
}
