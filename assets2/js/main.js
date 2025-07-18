document.addEventListener('DOMContentLoaded', function() {
    // Simple image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // ======================= COUNTDOWN TIMER FUNCTION =======================
    const timers = document.querySelectorAll(".countdown-timer");
    function updateCountdown() {
        timers.forEach((timer) => {
            const endTimeString = timer.getAttribute("data-end-time");
            const endTime = new Date(endTimeString).getTime();
            const now = new Date().getTime();
            const distance = endTime - now;
            if (distance < 0) {
                timer.innerHTML = "Time's Up!";
                timer.classList.add("expired");
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const formattedHours = String(hours).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");
            const formattedSeconds = String(seconds).padStart(2, "0");
            if (days > 0) {
                timer.innerHTML = `${days} Days ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            } else {
                timer.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            }
        });
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
    // ======================= LOAD MORE PROMOTIONS FUNCTION =======================
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const promoCards = document.querySelectorAll(".promo-card");
    const cardsPerLoad = 6;
    let currentlyVisible = cardsPerLoad;
    promoCards.forEach((card, index) => {
        if (index >= cardsPerLoad) {
            card.classList.add("hidden");
        }
    });
    if (promoCards.length <= cardsPerLoad) {
        if (loadMoreBtn) {
            loadMoreBtn.classList.add("hidden");
        }
    }
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            for (let i = currentlyVisible; i < currentlyVisible + cardsPerLoad; i++) {
                if (promoCards[i]) {
                    promoCards[i].classList.remove("hidden");
                }
            }
            currentlyVisible += cardsPerLoad;
            if (currentlyVisible >= promoCards.length) {
                loadMoreBtn.classList.add("hidden");
            }
        });
    }
    // ======================= SEARCH ENHANCEMENT =======================
    const searchBox = document.querySelector('.search-box');
    const searchForm = document.querySelector('.search-form');
    
    if (window.innerWidth > 768 && !searchBox.value) {
        searchBox.focus();
    }
    
    searchForm.addEventListener('submit', function() {
        const submitBtn = document.querySelector('.search-btn');
        submitBtn.innerHTML = '<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-radius:50%;border-top-color:#fff;animation:spin 1s ease-in-out infinite;"></div>';
    });

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', function() {
            // Tutup FAQ lain (hanya satu yang terbuka, single-open style)
            faqQuestions.forEach(otherQ => {
                if (otherQ !== q) {
                    otherQ.setAttribute('aria-expanded', 'false');
                }
            });
            // Toggle FAQ aktif
            const expanded = q.getAttribute('aria-expanded') === 'true';
            q.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
        q.addEventListener('keydown', function(e) {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            q.click();
        }
    });
    });

    // Hamburger menu
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
        // Update aria
        navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active') ? 'true' : 'false');
    });
    document.addEventListener('click', function(e) {
        if (
          mainNav.classList.contains('active') &&
          !mainNav.contains(e.target) &&
          !navToggle.contains(e.target)
        ) {
          mainNav.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    // Auto close menu jika klik link (opsional UX)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

});
