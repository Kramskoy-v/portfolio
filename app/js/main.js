'use strict'
//Hamburger menu
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.menu');
let linkClose = document.querySelector('.menu__list');

hamburger.addEventListener('click', function() {
hamburger.classList.toggle('hamburger--active') 
& mobileMenu.classList.toggle('menu--active')
});

function closeMenu() {
   mobileMenu.classList.remove('menu--active');
}
function closeHam() {
   hamburger.classList.remove('hamburger--active');
}

linkClose.addEventListener('touchstart', function(event){
   if (event.target.closest('.menu__link')){
      closeMenu(), closeHam();
   }
})

//animations
document.addEventListener('DOMContentLoaded', () => {
	const scrollItems = document.querySelectorAll('.scroll-item');

const scrollAnimation = () => {
	let windowCenter = (window.innerHeight / 1.5) + window.scrollY;
	scrollItems.forEach(el => {
		let scrollOffset = el.offsetTop;
		if (windowCenter >= scrollOffset) {
			el.classList.add('animation');
		} else {
			el.classList.remove('animation');
		}
	})
	};
	scrollAnimation(); 
	window.addEventListener('scroll', () => {
		scrollAnimation(); 
	});
});