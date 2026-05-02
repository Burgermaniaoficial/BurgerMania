// Botão voltar ao topo
(function () {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('is-visible', window.scrollY > 200);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}());

// Bloquear scroll horizontal
window.addEventListener('scroll', () => {
    if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
}, { passive: true });

// Scroll suave customizado
(function () {
    function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function smoothScrollTo(target, duration) {
        const start = window.scrollY;
        const distance = target - start;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + distance * easeInOutQuart(progress));
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            smoothScrollTo(top, 900);
        });
    });
}());

// Intersection Observer para animações ao scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

if (menuToggle && siteHeader) {
    menuToggle.addEventListener('click', () => {
        siteHeader.classList.toggle('nav-open');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (siteHeader.classList.contains('nav-open')) {
            siteHeader.classList.remove('nav-open');
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 150);
        }
    });
}, observerOptions);

// Observar seções e cards
document.querySelectorAll('section, .burger-card').forEach(el => {
    observer.observe(el);
});

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * -0.3 + 'px';
    }
});

// Efeito de brilho aprimorado nas imagens dos burgers
document.querySelectorAll('.burger-image').forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.filter = 'brightness(1.25) contrast(1.15) saturate(1.2)';
    });
    image.addEventListener('mouseleave', () => {
        image.style.filter = 'none';
    });
});

// Burger Modal
(function () {
    const modal     = document.getElementById('burgerModal');
    const modalImg  = document.getElementById('burgerModalImg');
    const modalTitle = document.getElementById('burgerModalTitle');
    const modalDesc = document.getElementById('burgerModalDesc');
    const closeBtn  = document.getElementById('burgerModalClose');

    if (!modal) return;

    document.querySelectorAll('.burger-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img  = card.querySelector('.burger-image img');
            const h3   = card.querySelector('.burger-info h3');
            const desc = card.querySelector('.burger-info p');
            modalImg.src        = img.src;
            modalImg.alt        = img.alt;
            modalTitle.textContent = h3.textContent;
            modalDesc.textContent  = desc.textContent;
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    });

    function close() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
}());

// Lightbox
(function () {
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn    = document.getElementById('lightboxClose');

    if (!lightbox || !lightboxImg) return;

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.carousel-slide img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}());

// Trajetória — cards + modal com carrossel
(function () {
    const moments = [
        {
            period: '2013 - 2019',
            title: 'O Início',
            images: [
                './assets/f11.JPG',
                './assets/f12.JPG',
                './assets/f13.JPG',
                './assets/f14.JPG',
                './assets/f15.JPG',
                './assets/f16.JPG',
                './assets/f17.JPG'
            ],
            description: 'A nossa história começou em 2013, quando um sonho antigo começou a sair do papel.\n\nFomos até São Paulo buscar o necessário e, em Santa Rita do Sapucaí, encontramos uma garagem vazia que nos encantou — foi ali que começamos.\n\nCom muito trabalho, transformamos o espaço e demos vida ao nosso primeiro ponto. A inauguração superou as expectativas e, aos poucos, fomos crescendo e criando nossa identidade.\n\nForam 6 anos nesse lugar, onde construímos nossa base e transformamos um sonho em realidade.'
        },
        {
            period: '2020 - 2022',
            title: 'Crescimento',
            images: [
                './assets/f21.jpg',
                './assets/f22.jpg',
                './assets/f23.jpg',
                './assets/f24.jpg',
                './assets/f25.jpg'
            ],
            description: 'Após seis anos no nosso primeiro endereço, entendemos que era hora de evoluir.\n\nBuscávamos um espaço mais alinhado com a experiência que queríamos proporcionar — e foi então que nos mudamos.\n\nDessa vez, para um ponto comercial menor, mais reservado, mas com muito mais personalidade. Um ambiente mais íntimo, que nos aproximou ainda mais de quem chegava.\n\nFoi nesse espaço que começamos a refinar tudo: receitas, combinações e detalhes que hoje definem quem somos.\n\nDepois de anos de aprendizado, foi ali que nosso sonho ganhou forma, identidade e propósito.'
        },
        {
            period: '2022 - 2023',
            title: 'Expansão',
            images: [
                './assets/f31.jpg',
                './assets/f32.jpg',
                './assets/f33.jpg',
                './assets/f34.JPG',
                './assets/f35.JPG'
            ],
            description: 'Depois de dois anos no segundo espaço, percebemos que era hora de dar mais um passo.\n\nA demanda crescia e o lugar já não comportava tudo, então buscamos um espaço maior, sem abrir mão da nossa identidade.\n\nEscolhemos um ponto mais amplo, no coração de Santa Rita do Sapucaí, perto da igreja — um lugar com personalidade e espaço para crescer.\n\nAli, seguimos evoluindo, aprimorando cada detalhe e fortalecendo quem éramos.\n\nFoi um período de consolidação — e também o começo da nossa mudança para São José dos Campos.'
        },
        {
            period: '2026',
            title: 'Hoje',
            images: [
                './assets/f41.jpg',
                './assets/f42.jpg',
                './assets/f43.jpg',
                './assets/f44.jpg',
                './assets/f45.PNG',
                './assets/f46.jpg',
                './assets/f47.jpg',
                './assets/f48.jpg',
                './assets/f49.PNG',
                './assets/f410.PNG'
            ],
            description: 'Depois de dez anos em Santa Rita do Sapucaí, sentimos que era o momento de ir além.\n\nNossa história já tinha raízes fortes, mas também trazia o desejo de crescer e explorar novas possibilidades — e, para isso, precisávamos mudar.\n\nApós muito pensar, escolhemos São José dos Campos, uma cidade com a energia e o cenário que buscávamos para a próxima fase.\n\nLevamos conosco tudo o que construímos e começamos um novo capítulo.\n\nMais do que uma mudança de cidade, foi uma evolução. Hoje, seguimos crescendo, sem perder a nossa essência.'
        }
    ];

    const modal       = document.getElementById('trajModal');
    const slides      = document.getElementById('trajSlides');
    const dots        = document.getElementById('trajDots');
    const counter     = document.getElementById('trajCounter');
    const prevBtn     = document.getElementById('trajPrev');
    const nextBtn     = document.getElementById('trajNext');
    const closeBtn    = document.getElementById('trajClose');
    const sliderPeriod = document.getElementById('trajSliderPeriod');
    const modalTitle  = document.getElementById('trajModalTitle');
    const modalDesc   = document.getElementById('trajModalDesc');

    if (!modal) return;

    let current = 0;
    let total   = 0;
    let touchX  = 0;

    /* ── abrir modal ── */
    document.querySelectorAll('.traj-card').forEach(card => {
        const open = () => openModal(+card.dataset.moment);
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });

    function openModal(idx) {
        const m = moments[idx];
        sliderPeriod.textContent = m.period;
        modalTitle.textContent  = m.title;
        modalDesc.innerHTML = m.description
            .split('\n\n')
            .map(p => `<p>${p}</p>`)
            .join('');

        slides.innerHTML = '';
        dots.innerHTML   = '';
        total   = m.images.length;
        current = 0;

        m.images.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'traj-slide';
            slide.innerHTML = `<img src="${src}" alt="${m.title} — foto ${i + 1}" loading="lazy">`;
            slides.appendChild(slide);

            const img = slide.querySelector('img');
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openTrajLightbox(m.images, i));

            const dot = document.createElement('button');
            dot.className = 'traj-dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', `Foto ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dots.appendChild(dot);
        });

        update();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    /* ── fechar modal ── */
    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    /* ── navegar slides ── */
    function goTo(idx) {
        current = Math.max(0, Math.min(idx, total - 1));
        update();
    }

    function update() {
        slides.style.transform = `translateX(-${current * 100}%)`;
        dots.querySelectorAll('.traj-dot').forEach((d, i) =>
            d.classList.toggle('is-active', i === current)
        );
        counter.textContent = `${current + 1} / ${total}`;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    /* ── swipe mobile ── */
    slides.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    slides.addEventListener('touchend', e => {
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    });

    /* ── teclado ── */
    document.addEventListener('keydown', e => {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'Escape')     closeModal();
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}());

// Lightbox carrossel da trajetória
(function () {
    const lb      = document.getElementById('trajLightbox');
    const lbImg   = document.getElementById('trajLbImg');
    const lbPrev  = document.getElementById('trajLbPrev');
    const lbNext  = document.getElementById('trajLbNext');
    const lbClose = document.getElementById('trajLbClose');
    const lbCount = document.getElementById('trajLbCounter');
    if (!lb) return;

    let images = [];
    let cur = 0;

    window.openTrajLightbox = function (imgs, startIndex) {
        images = imgs;
        cur = startIndex;
        show();
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    function show() {
        lbImg.src = images[cur];
        lbCount.textContent = `${cur + 1} / ${images.length}`;
        lbPrev.disabled = cur === 0;
        lbNext.disabled = cur === images.length - 1;
    }

    function close() {
        lb.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    lbPrev.addEventListener('click', () => { if (cur > 0) { cur--; show(); } });
    lbNext.addEventListener('click', () => { if (cur < images.length - 1) { cur++; show(); } });
    lbClose.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('is-open')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  { if (cur > 0) { cur--; show(); } }
        if (e.key === 'ArrowRight') { if (cur < images.length - 1) { cur++; show(); } }
    });

    // Swipe mobile
    let tx = 0;
    lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
        const diff = tx - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0 && cur < images.length - 1) { cur++; show(); }
            if (diff < 0 && cur > 0)                 { cur--; show(); }
        }
    });
}());

// Gallery Carousel
(function () {
    const container = document.querySelector('.carousel-track-container');
    const prevBtn   = document.querySelector('.carousel-btn--prev');
    const nextBtn   = document.querySelector('.carousel-btn--next');

    if (!container || !prevBtn || !nextBtn) return;

    function scrollStep() {
        const slide = container.querySelector('.carousel-slide');
        if (!slide) return 280;
        const gap = parseFloat(window.getComputedStyle(container.querySelector('.carousel-track')).gap) || 16;
        return slide.offsetWidth + gap;
    }

    function refreshButtons() {
        prevBtn.disabled = container.scrollLeft <= 0;
        nextBtn.disabled = container.scrollLeft >= container.scrollWidth - container.clientWidth - 2;
    }

    prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });

    container.addEventListener('scroll', refreshButtons, { passive: true });
    window.addEventListener('resize', refreshButtons);
    refreshButtons();
}());

