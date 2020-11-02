'use strict';
let body = document.querySelector('body');
let fixed_padding = document.getElementsByClassName('fixed-padding');

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if(ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = ('url('+ib[i].querySelector('.ib_use').getAttribute('src')+')').replace(!'img/slide-l.jpg', '../');
		}
	}
}

ib();

/* Slider-Sm */

$(document).ready(function() {
	$('.slider-sm').on('init', function(slick) {

	});

	$('.slider-sm').slick({
		slidesToShow: 1,
		autoplay: true,
	});
});

/* Slider-L */

let curSlide_L = document.getElementById('current-slide');
let allSlide_L = document.getElementById('counter-all');
let slidesNum = document.querySelectorAll('.slider-l__slide').length;
let counter_line = document.querySelector('.counter__line').offsetWidth / slidesNum;
let counter_subline = document.querySelector('.counter__subline');
let name_block = document.querySelectorAll('.slide-name__block');
let curSlideNum = 0;
let prevName = 0;

counter_subline.style.width = counter_line + 'px';
allSlide_L.innerHTML = '0' + slidesNum;
name_block[prevName].classList.add('active');

$(document).ready(function() {
	$('.slider-l').on('afterChange', function(slick, currentSlide) {
		curSlide_L.innerHTML = '0' + (currentSlide.currentSlide + 1);
		counter_subline.style.width = counter_line * (currentSlide.currentSlide + 1) + 'px';
		name_block[currentSlide.currentSlide].classList.add('active');
		if (prevName != currentSlide.currentSlide) {
			name_block[prevName].classList.remove('active');
		}
		prevName = currentSlide.currentSlide;
	});

	$('.slider-l').slick({
		slidesToShow: 1,
		arrows: false,
		autoplay: true,
	});
});

/* Burger */

let check = document.getElementById('burg-check');
let burg_link = document.getElementsByClassName('burg-link');

if (check.checked) {
	burgBodyLock();
} else {
	burgBodyUnLock();
}

for(let i = 0, length = burg_link.length; i < length; i++) {
	burg_link[i].addEventListener('click', function(e) {
		if (check.checked) {
			check.checked = false;
			burgBodyUnLock();
		}
	});
}

check.addEventListener('click', function(e) {
	let popupActive = document.querySelector('.popup.open');

	if (popupActive) {
		closePopup(popupActive, false);
	}

	if (check.checked) {
		burgBodyLock();
	} else {
		burgBodyUnLock();
	}
});

document.documentElement.addEventListener('click', function(e) {
	if ((!e.target.closest('.burger') && check.checked) || (e.target.closest('.black-bg') && check.checked)) {
		check.checked = false;
		burgBodyUnLock();
	}
});

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 300);
	function helpFunction() {
		if (fixed_padding.length > 0) {
			for(let i = 0, length = fixed_padding.length; i < length; i++) {
				fixed_padding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}

/* Slider-Best */

let best__slide = document.querySelectorAll('.best-slider__slide').length;
let curSlideBest = document.getElementById('best-slide');
let allSlideBest = document.getElementById('best-all');

allSlideBest.innerHTML = '0' + best__slide;

$(document).ready(function() {
	$('.best-slider').on('afterChange', function(slick, currentSlide) {
		curSlideBest.innerHTML = '0' + (currentSlide.currentSlide + 1);
	});

	$('.best-slider').slick({
		slidesToShow: 1,
		autoplay: false,
		infinite: false,
		rtl: true,
		prevArrow: $('.best__prev'),
		nextArrow: $('.best__next'),
	});
});

/* Slider-Holiday */

let holiday__slide = document.querySelectorAll('.holiday-slider__slide');
let prevHoliday = 2;
let indexHoliday = 2;
let width = document.querySelector('body').offsetWidth;

if (width <= 1500) {
	indexHoliday = 1;
}

if (width <= 767) {
	indexHoliday = 1;
}

holiday__slide[indexHoliday].classList.add('active');

$(document).ready(function() {
	$('.holiday-slider').on('afterChange', function(slick, currentSlide) {
		holiday__slide[currentSlide.currentSlide].classList.remove('active');
		holiday__slide[prevHoliday].classList.remove('active');
		if (currentSlide.currentSlide + indexHoliday < holiday__slide.length) {
			holiday__slide[currentSlide.currentSlide + indexHoliday].classList.add('active');
			prevHoliday = currentSlide.currentSlide + indexHoliday;
		}
	});

	$('.holiday-slider').slick({
		centerMode: true,
		slidesToShow: 3,
		infinite: false,
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			},
		],
	});
});

/* Smooth Scroll */

window.onload = function() {
	let anchors = document.querySelectorAll('._scroll-to');

	for(let i = 0, length = anchors.length; i < length; i++) {
		anchors[i].addEventListener('click', function(e) {
			let class_anchors = anchors[i].className.split('');
			let blockid = '';
			for(let i = 0, length = class_anchors.length; i < length; i++) {
				if (class_anchors[i] == '_' && class_anchors[i + 1] == 's' && class_anchors[i + 2] == '-') {
					for(let index = i + 3, length = class_anchors.length; index < length; index++) {
						if (class_anchors[index] !== '' && class_anchors[index] !== ' ') {
							blockid = blockid + class_anchors[index];
						} else {
							break;
						}
					}
				}
			}

			let scroll = document.getElementById(blockid).offsetTop;

			window.scrollTo({
				top: scroll,
				behavior: 'smooth',
			});
		});
	}
}

/* Aminate Page */

let animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
	function animItemsFunc() {
		for(let i = 0, length = animItems.length; i < length; i++) {
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItems[i].offsetHeight / animStart;

			if (animItems[i].offsetHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > offset(animItems[i]).top - animItemPoint) && pageYOffset < (offset(animItems[i]).top + animItems[i].offsetHeight)) {
				animItems[i].classList.add('active');
			}
		}
	}
	function offset(elem) {
		let rect = elem.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}

	window.addEventListener('scroll', animItemsFunc);
	setTimeout(animItemsFunc, 300);
}