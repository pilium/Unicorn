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

  $('.portfolio-filter li:not(.active)').on('click', function() {
    var slide = $('.js-portfolio-slider');
    var current = $(this).attr('data-filter');

    if (slide.hasClass('slick-initialized')) {
      slide.slick('unslick');
    }
    slide.empty();
    if (current !== 'all') {
      $('.portfolio-slider [data-filter="' + current + '"]').each(function() {
        $(this).clone().appendTo(slide);
      });
    } else {
      slide.html($('.portfolio-slider').html());
    }
    slide.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      customPaging: function(slider, i) {
        return '<a class="portfolio-dots"></a>';
      }
    });
    $(this).addClass('active').siblings().removeClass('active');
  }).filter('[data-filter="all"]').click();
});
function titleAnimate() {
  var elements = document.querySelectorAll('.g-section-title');

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('wow', 'slideInUp');
  }
}
titleAnimate();

var wow = new WOW(
  {
    offset: 0
  }
	);
wow.init();
