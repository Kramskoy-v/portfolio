import Typed from "typed.js";

const header = document.querySelector(".header");
const titleBox = document.querySelector(".home__title-box");
const titleDescription = document.querySelector(".home__description-box");
const homeArrow = document.querySelector(".home__arrow");

const homeTitle = new Typed(".home__title", {
  strings: ["Привет, Я Вячеслав! Я Web-разработчик"],
  typeSpeed: 50,
});

setTimeout(() => {
  const homeDescription = new Typed(".home__description", {
    strings: [
      "Здесь я рассказываю общую информацию о себе, своем опыте, выполненных работах",
    ],
    typeSpeed: 35,
  });
}, 3000);

setTimeout(() => {
  header.classList.remove("hidden");
  homeArrow.classList.remove("hidden");
  titleBox.classList.add("transform");
  titleDescription.classList.add("transform");
}, 8000);
