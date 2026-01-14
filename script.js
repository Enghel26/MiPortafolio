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
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Typewriter Effect
    const nameText = "Enghel Mejía Severino";
    const descText = "Estudiante de Ingeniería de Software en la UAPA. Desarrollador Web enfocado en crear experiencias digitales excepcionales con HTML, CSS, JS, Laravel y Blazor.";

    const nameContainer = document.getElementById('typewriter-name');
    const descContainer = document.getElementById('typewriter-desc');

    let nameIndex = 0;
    let descIndex = 0;

    function typeName() {
        if (nameIndex < nameText.length) {
            nameContainer.textContent += nameText.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            setTimeout(typeDesc, 500);
        }
    }

    function typeDesc() {
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
    const aboutText = "Soy estudiante de Ingeniería en Software en el UAPA con 3 años de experiencia como QA, lo que me ha dado un ojo crítico para el detalle y la calidad. Mi pasión y enfoque principal es el desarrollo web, donde doy vida a ideas utilizando tecnologías modernas y robustas.";
    const aboutText2 = "Me apasiona los deportes y realizar actividades físicas, pasar tiempo escuchando música y jugar videojuegos.";

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
});
