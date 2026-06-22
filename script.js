/* ═══════════════════════════════════════════════════════════════════════════
   Foltz.ai — Interactions & Animations
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initCMP();
});

/* ── Consent Management Platform (CMP) ─────────────────────────────────── */
function initCMP() {
    const cmpBanner = document.getElementById('cmp-banner');
    if (!cmpBanner) return;

    const consent = localStorage.getItem('foltzai_consent');
    if (!consent) {
        setTimeout(() => {
            cmpBanner.classList.add('visible');
        }, 1500);
    }

    document.getElementById('cmp-accept')?.addEventListener('click', () => {
        localStorage.setItem('foltzai_consent', 'all');
        cmpBanner.classList.remove('visible');
    });

    document.getElementById('cmp-decline')?.addEventListener('click', () => {
        localStorage.setItem('foltzai_consent', 'essential');
        cmpBanner.classList.remove('visible');
    });
}

/* ── Nav Background on Scroll ──────────────────────────────────────────── */
function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ── Mobile Hamburger Menu ─────────────────────────────────────────────── */
function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const links = document.getElementById('nav-links');
    if (!hamburger || !links) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            links.classList.remove('open');
        });
    });
}

/* ── Smooth Scroll ─────────────────────────────────────────────────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = 72;
                const y = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
}
