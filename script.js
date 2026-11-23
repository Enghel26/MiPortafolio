document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    // Header effect on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Background Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function nextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 4000);
    }

    // Generic Rain Function
    function createRain(container, items, isEmoji = true) {
        if (!container) return;

        function createDrop() {
            const drop = document.createElement('span');
            drop.classList.add('skill-drop');
            drop.innerText = items[Math.floor(Math.random() * items.length)];

            const left = Math.random() * 100;
            const duration = Math.random() * 5 + (isEmoji ? 5 : 4);
            const fontSize = Math.random() * (isEmoji ? 15 : 12) + (isEmoji ? 15 : 10);
            const delay = Math.random() * 5;

            drop.style.left = `${left}%`;
            drop.style.animationDuration = `${duration}s`;
            drop.style.fontSize = `${fontSize}px`;
            drop.style.animationDelay = `-${delay}s`;
            drop.style.opacity = isEmoji ? '0.2' : '0.3';

            container.appendChild(drop);

            setTimeout(() => {
                drop.remove();
            }, duration * 1000);
        }

        for (let i = 0; i < 15; i++) createDrop();
        setInterval(createDrop, isEmoji ? 400 : 300);
    }

    // Hobby Rain (Under Carousel to end of About)
    const hobbyContainer = document.getElementById('hobby-rain');
    const hobbyIcons = ['⚾', '🏀', '🎮', '⭐', '🎵', '🍃', '🍔', '💪🏽', 'JJ', '🇩🇴'];
    createRain(hobbyContainer, hobbyIcons, true);

    // Skill Rain (Distributed across sections to avoid stretching page)
    const skillIcons = ['HTML', 'CSS', 'JS', '</>', 'Laravel', 'Blazor', 'PHP', 'MySQL', 'QA'];

    createRain(document.getElementById('skill-rain'), skillIcons, false);
    createRain(document.getElementById('skill-rain-contact'), skillIcons, false);
    createRain(document.getElementById('skill-rain-footer'), skillIcons, false);

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    let currentLang = localStorage.getItem('lang') || 'es';

    document.documentElement.setAttribute('data-theme', currentTheme);

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (translations[lang][key].includes('<span>')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });
        if (langToggle) {
            langToggle.innerText = lang === 'es' ? 'EN' : 'ES';
        }
    }

    applyLanguage(currentLang);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', currentLang);
            applyLanguage(currentLang);
            // Optional: Reload or restart typewriter if needed
            location.reload(); // Simple way to restart animations with new language
        });
    }

    // Typewriter Effect
    const nameText = translations[currentLang].tw_name;
    const descText = translations[currentLang].tw_desc;

    const nameContainer = document.getElementById('typewriter-name');
    const descContainer = document.getElementById('typewriter-desc');

    let nameIndex = 0;
    let descIndex = 0;

    function typeName() {
        if (!nameContainer) return;
        if (nameIndex < nameText.length) {
            nameContainer.textContent += nameText.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            setTimeout(typeDesc, 500);
        }
    }

    function typeDesc() {
        if (!descContainer) return;
        if (descIndex < descText.length) {
            descContainer.textContent += descText.charAt(descIndex);
            descIndex++;
            setTimeout(typeDesc, 30);
        }
    }

    if (nameContainer && descContainer) {
        typeName();
    }

    // About Me Typewriter with Scroll Trigger
    const aboutText = translations[currentLang].tw_about;
    const aboutText2 = translations[currentLang].tw_hobbies;

    const aboutContainer = document.getElementById('typewriter-about');
    const hobbiesContainer = document.getElementById('typewriter-hobbies');

    let aboutIndex = 0;
    let hobbiesIndex = 0;
    let aboutStarted = false;

    function typeAbout() {
        if (aboutIndex < aboutText.length) {
            aboutContainer.textContent += aboutText.charAt(aboutIndex);
            aboutIndex++;
            setTimeout(typeAbout, 20);
        } else {
            setTimeout(typeHobbies, 500);
        }
    }

    function typeHobbies() {
        if (hobbiesIndex < aboutText2.length) {
            hobbiesContainer.textContent += aboutText2.charAt(hobbiesIndex);
            hobbiesIndex++;
            setTimeout(typeHobbies, 20);
        }
    }

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !aboutStarted) {
                aboutStarted = true;
                typeAbout();
            }
        });
    }, observerOptions);

    if (aboutContainer) {
        observer.observe(aboutContainer);
    }

    // Projects Horizontal Dynamic Carousel Controls & Auto-Play
    const projectsSlider = document.getElementById('projects-slider');
    const projectsPrev = document.getElementById('projects-prev');
    const projectsNext = document.getElementById('projects-next');
    const projectsDotsContainer = document.getElementById('projects-dots');

    if (projectsSlider && projectsPrev && projectsNext) {
        const cards = Array.from(projectsSlider.querySelectorAll('.project-card'));
        let autoPlayTimer = null;
        const AUTO_PLAY_INTERVAL = 3500;

        const getScrollAmount = () => {
            const firstCard = cards[0];
            return firstCard ? firstCard.offsetWidth + 20 : 310;
        };

        // Build pagination dots
        if (projectsDotsContainer && cards.length > 0) {
            cards.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.className = `carousel-dot${idx === 0 ? ' active' : ''}`;
                dot.setAttribute('aria-label', `Ir al proyecto ${idx + 1}`);
                dot.addEventListener('click', () => {
                    projectsSlider.scrollTo({
                        left: idx * getScrollAmount(),
                        behavior: 'smooth'
                    });
                    resetAutoPlay();
                });
                projectsDotsContainer.appendChild(dot);
            });
        }

        const updateActiveDot = () => {
            if (!projectsDotsContainer) return;
            const dots = projectsDotsContainer.querySelectorAll('.carousel-dot');
            const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;
            let activeIdx = Math.round(projectsSlider.scrollLeft / getScrollAmount());
            if (projectsSlider.scrollLeft >= maxScroll - 10) {
                activeIdx = cards.length - 1;
            }
            activeIdx = Math.max(0, Math.min(cards.length - 1, activeIdx));
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIdx);
            });
        };

        const stepNext = () => {
            const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;
            if (projectsSlider.scrollLeft >= maxScroll - 15) {
                projectsSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                projectsSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        };

        const stepPrev = () => {
            if (projectsSlider.scrollLeft <= 15) {
                const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;
                projectsSlider.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                projectsSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        };

        const startAutoPlay = () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            stopAutoPlay();
            autoPlayTimer = setInterval(stepNext, AUTO_PLAY_INTERVAL);
        };

        const stopAutoPlay = () => {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        };

        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        projectsPrev.addEventListener('click', () => {
            stepPrev();
            resetAutoPlay();
        });

        projectsNext.addEventListener('click', () => {
            stepNext();
            resetAutoPlay();
        });

        projectsSlider.addEventListener('scroll', updateActiveDot, { passive: true });
        projectsSlider.addEventListener('mouseenter', stopAutoPlay);
        projectsSlider.addEventListener('mouseleave', startAutoPlay);
        projectsSlider.addEventListener('touchstart', stopAutoPlay, { passive: true });
        projectsSlider.addEventListener('touchend', startAutoPlay, { passive: true });
        projectsSlider.addEventListener('focusin', stopAutoPlay);
        projectsSlider.addEventListener('focusout', startAutoPlay);

        projectsSlider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                stepNext();
                resetAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stepPrev();
                resetAutoPlay();
            }
        });

        startAutoPlay();
    }

    // Mobile Menu Toggle logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const isExpanded = navLinksContainer.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        });
    }
});
