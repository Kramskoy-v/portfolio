import Swiper from "swiper/bundle";

const swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0.5,
  centeredSlides: true,
  mousewheel: true,
  effect: "coverflow",
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    769: {
      slidesPerView: 3,
      spaceBetween: 50,
      direction: "vertical",
      pagination: {
        enabled: false,
      },
    },
    576: {
      slidesPerView: 1.7,
      spaceBetween: 10,
    },
  },
});
