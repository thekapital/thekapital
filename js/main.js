jQuery(document).ready(function($) {

	'use strict';

      var owl = $("#owl-testimonials");

        owl.owlCarousel({
          
          pagination : true,
          paginationNumbers: false,
          autoPlay: 6000, //Set AutoPlay to 3 seconds
          items : 1, //10 items above 1000px browser width
          itemsDesktop : [1000,1], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,1], // betweem 900px and 601px
          itemsTablet: [600,1], //2 items between 600 and 0
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
          
      });


        var top_header = $('.parallax-content');
        top_header.css({'background-position':'center center'}); // better use CSS

        $(window).scroll(function () {
        var st = $(this).scrollTop();
        top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
        });


        $('.counter').each(function() {
          var $this = $(this),
              countTo = $this.attr('data-count');
          
          $({ countNum: $this.text()}).animate({
            countNum: countTo
          },

          {

            duration: 8000,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }

          });  
          
        });


        $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
        })



        $(".pop-button").click(function () {
            $(".pop").fadeIn(300);
            
        });

        $(".pop > span").click(function () {
            $(".pop").fadeOut(300);
        });


        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".header").addClass("active");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
               $(".header").removeClass("active");
            }
        });


	/************** Mixitup (Filter Projects) *********************/
    	$('.projects-holder').mixitup({
            effects: ['fade','grayscale'],
            easing: 'snap',
            transitionSpeed: 400
        });


function runTheKapitalCalc() {
    const pInput = document.getElementById('loanAmount');
    const rInput = document.getElementById('interestRate');
    const tInput = document.getElementById('loanTerm');
    const fInput = document.getElementById('frequency');
    const dPayment = document.getElementById('displayPayment');

    if (!pInput || !dPayment) return; // Sayfada element yoksa hata verme

    function update() {
        const P = parseFloat(pInput.value);
        const annualR = parseFloat(rInput.value) / 100;
        const years = parseFloat(tInput.value);
        const freq = parseFloat(fInput.value);

        const r = annualR / freq;
        const n = years * freq;

        if (P > 0 && r > 0 && n > 0) {
            const m = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const total = m * n;
            
            dPayment.innerText = "$" + Math.round(m).toLocaleString('en-AU');
            if(document.getElementById('totalInterest')) {
                document.getElementById('totalInterest').innerText = "$" + Math.round(total - P).toLocaleString('en-AU');
                document.getElementById('totalPayable').innerText = "$" + Math.round(total).toLocaleString('en-AU');
            }
        }
    }

    [pInput, rInput, tInput, fInput].forEach(el => {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
    });

    update(); // İlk açılışta çalıştır
}

// Tinker şablonunun JQuery yüklemesinden sonra çalışması için
$(document).ready(function() {
    runTheKapitalCalc();
});

});
