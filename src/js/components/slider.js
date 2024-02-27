import Swiper from "swiper/bundle";

const swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    centeredSlides: true,
    mousewheel: true,
    direction: "vertical",
    effect: "coverflow",
});
