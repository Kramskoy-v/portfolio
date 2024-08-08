import Swiper from "swiper/bundle";

const swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0.5,
  centeredSlides: true,
  mousewheel: true,
  effect: "coverflow",
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 50,
      direction: "vertical",
    },
    576: {
      slidesPerView: 1.7,
      spaceBetween: 10,
    },
  },
});
