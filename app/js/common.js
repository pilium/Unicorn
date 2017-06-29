$(window).on('load', function() {
  $('.preloader').delay(1000).fadeOut('slow');
});

$(document).ready(function() {
  $('.js-featured__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    nextText: '',
    prevText: '',
    nextArrow: '.featured-slider_next',
    prevArrow: '.featured-slider_prev',
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 666,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  });

  $('.js-clients__slider').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    nextText: '',
    prevText: '',
    nextArrow: '.clients-slider_next',
    prevArrow: '.clients-slider_prev',
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
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

  $('.js-articles-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    prevArrow: '.articles-slider__prev',
    nextArrow: '.articles-slider__next'
  });

  $('.header-nav__toggle').click(function() {
    $('.header-nav').toggleClass('active');
  });
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
