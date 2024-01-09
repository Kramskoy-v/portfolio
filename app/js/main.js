'use strict';
//Hamburger menu
const hamburger = document.querySelector('.hamburger'),
    mobileMenu = document.querySelector('.menu'),
    linkClose = document.querySelector('.menu__list');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger--active');
    mobileMenu.classList.toggle('menu--active');
});

const closeMenu = () => {
    mobileMenu.classList.remove('menu--active');
};

const closeHam = () => {
    hamburger.classList.remove('hamburger--active');
};

linkClose.addEventListener('touchstart', function (event) {
    if (event.target.closest('.menu__link')) {
        closeMenu(), closeHam();
    }
});

//animations
document.addEventListener('DOMContentLoaded', () => {
    const scrollItems = document.querySelectorAll('.scroll-item');

    const scrollAnimation = () => {
        const windowCenter = (window.innerHeight / 1.5) + window.scrollY;
        scrollItems.forEach(el => {
            const scrollOffset = el.offsetTop;
            if (windowCenter >= scrollOffset) {
                el.classList.add('animation');
            } else {
                el.classList.remove('animation');
            }
        });
    };
    scrollAnimation();
    window.addEventListener('scroll', () => {
        scrollAnimation();
    });
});


//animations home title
const text = [
        'Привет, Я Вячеслав!\n',
        'Я Веб-разработчик'
    ],
    htmlOut = document.querySelector('.out');

let line = 0,
    count = 0,
    out = '';

const typeLine = () => {
    let interval = setTimeout(() => {
        out += text[line][count];
        htmlOut.innerHTML = `${out}|`;
        count++;
        if (count >= text[line].length) {
            count = 0;
            line++;
            if (line == text.length) {
                clearTimeout(interval);
                htmlOut.innerHTML = out;
                return true;
            }
        }
        typeLine();
    }, 150);
};

typeLine();

// smooth scroll
const menuLinks = document.querySelectorAll('.menu__link');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth',
        });
    });
});

// bg for safari
const bgHomeContainer = document.querySelector('.home .container');

(navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1) ?
    bgHomeContainer.style.backgroundAttachment = 'scroll' : null;

