AOS.init({
  duration: 800,
  easing: 'slide'
});

(function($) {
  "use strict";

  // Stellar.js for parallax (keep if you need it)
  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });

  // Full height elements
  var fullHeight = function() {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function() {
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  // Loader
  var loader = function() {
    setTimeout(function() {
      if ($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show');
      }
    }, 1);
  };
  loader();

  // Scrollax
  $.Scrollax();

  // Fixed Mobile Menu Bug
  var burgerMenu = function() {
    $('body').on('click', '.js-fh5co-nav-toggle', function(event) {
      event.preventDefault();
      $(this).toggleClass('active');
    });

    // THIS FIXES THE MENU BUG - Auto-close when clicking links
    $('#ftco-nav a').on('click', function() {
      if ($(window).width() < 992) { // Only for mobile
        $('.js-fh5co-nav-toggle').removeClass('active');
        $('#ftco-nav').collapse('hide');
      }
    });
  };
  burgerMenu();

  // Smooth scrolling (updated to work with menu fix)
  var onePageClick = function() {
    $(document).on('click', '#ftco-nav a[href^="#"]', function(event) {
      event.preventDefault();
      var href = $.attr(this, 'href');
      
      $('html, body').animate({
        scrollTop: $(href).offset().top - 70
      }, 500, function() {
        // Auto-close mobile menu after scroll
        if ($(window).width() < 992) {
          $('.js-fh5co-nav-toggle').removeClass('active');
          $('#ftco-nav').collapse('hide');
        }
      });
    });
  };
  onePageClick();

  // Carousel
  var carousel = function() {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    });
  };
  carousel();

  // Dropdown hover
  $('nav .dropdown').hover(function() {
    var $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function() {
    var $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });

  // Scroll effects
  var scrollWindow = function() {
    $(window).scroll(function() {
      var $w = $(this),
          st = $w.scrollTop(),
          navbar = $('.ftco_navbar'),
          sd = $('.js-scroll-wrap');

      if (st > 150) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled');
        }
      }
      if (st < 150) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep');
        }
      }
      if (st > 350) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake');
        }
        if (sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if (st < 350) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if (sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  // Counter animation
  var counter = function() {
    $('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
        $('.number').each(function() {
          var $this = $(this),
              num = $this.data('number');
          $this.animateNumber({
            number: num,
            numberStep: comma_separator_number_step
          }, 7000);
        });
      }
    }, { offset: '95%' });
  };
  counter();

  // Content animation
  var contentWayPoint = function() {
    var i = 0;
    $('.ftco-animate').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function() {
          $('body .ftco-animate.item-animate').each(function(k) {
            var el = $(this);
            setTimeout(function() {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn ftco-animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft ftco-animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight ftco-animated');
              } else {
                el.addClass('fadeInUp ftco-animated');
              }
              el.removeClass('item-animate');
            }, k * 50, 'easeInOutExpo');
          });
        }, 100);
      }
    }, { offset: '95%' });
  };
  contentWayPoint();

  // Magnific Popup
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

})(jQuery);
