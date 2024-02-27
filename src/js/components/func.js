// smooth scroll
const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href").substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: "smooth",
        });
    });
});

// анимация появления блоков
document.addEventListener("DOMContentLoaded", () => {
    const scrollItems = document.querySelectorAll(".scroll-item");

    const scrollAnimation = () => {
        const windowCenter = window.innerHeight / 1.5 + window.scrollY;
        scrollItems.forEach((el) => {
            const scrollOffset = el.offsetTop;
            if (windowCenter >= scrollOffset) {
                el.classList.add("animation");
            }
        });
    };
    scrollAnimation();
    window.addEventListener("scroll", () => {
        scrollAnimation();
    });
});
