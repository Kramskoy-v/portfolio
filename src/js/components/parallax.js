import Parallax from "parallax-js";

const itemsParallax = document.querySelectorAll(".skills__image");
itemsParallax.forEach((scene, index) => {
  scene.setAttribute("data-relative-input", true);

  const sceneImg = scene.querySelector("img");
  const result = (index + 1) % 2 ? 0.05 : -0.05;
  sceneImg.setAttribute("data-depth", result);

  const parallaxInstance = new Parallax(scene);
});
