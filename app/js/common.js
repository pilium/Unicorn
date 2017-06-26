$(window).on('load', function() {
  $('.preloader').delay(1000).fadeOut('slow');
});

$(document).ready(function() {
  $('.js-featured__slider').bxSlider({
	  hideControlOnEnd: true,
    minSlides: 1,
    maxSlides: 3,
    slideWidth: 360,
    slideMargin: 20,
    pager: false,
    infiniteLoop: false,
    nextText: '',
    prevText: '',
    nextSelector: '.featured-slider_next',
    prevSelector: '.featured-slider_prev'
  });
  $('.js-clients__slider').bxSlider({
	  hideControlOnEnd: true,
    minSlides: 1,
    maxSlides: 6,
    slideWidth: 180,
    slideMargin: 35,
    pager: false,
    infiniteLoop: true,
    nextText: '',
    prevText: '',
    nextSelector: '.clients-slider_next',
    prevSelector: '.clients-slider_prev'
  });
});

wow = new WOW(
  {
    offset: 0
  }
);
wow.init();

var elements = document.querySelectorAll('.g-section-title');

for (var i = 0; i < elements.length; i++) {
  elements[i].classList.add('wow', 'slideInUp');
}