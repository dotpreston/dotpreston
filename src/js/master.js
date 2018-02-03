jQuery(function ($) {

    if($('.jsLeadSection').length > 0) {
        var $lead_height = $('.jsLeadSectionTitle').height();
        revealLeadSection($lead_height);
        window.addEventListener("resize", function () {
            if($('.jsLeadSectionContainer').hasClass('jsScrollComplete')) {
                revealLeadSection($lead_height);
            }
        }, false);

        var $main_top = $('.jsLeadSectionScroll').offset().top;
        var $my_work_top = $('.jsMyWork').offset().top - 150;
        var $window = $(window);

        navToggle($window);
        $window.scroll(function() {
            navToggle($window);
        });

    }

    $( ".jsMenuOpen" ).on( "click", function() {
        $('.jsMenu').css('height', '100%');
        $('.jsMenuOpen').hide();
    });

    $( ".jsMenuClose" ).on( "click", function() {
        $('.jsMenu').css('height', '0');
        $('.jsMenuOpen').show();
    });

    $('.carousel').slick();

    $(".jsLeadSectionScroll").click(function(e) {
        e.preventDefault();
        var $destination = $(this).attr('data-scroll');
        var $offset = 100;
        if($('header').css('position') == 'absolute') {
            $offset = 0;
        }
        $('html, body').animate({
            scrollTop: $("#" + $destination).offset().top - $offset
        }, 2000);
    });

    function revealLeadSection($lead_height)
    {
        $('.jsLeadSectionContainer').removeClass('jsScrollComplete');
        $('.jsLeadSectionContainer').fadeTo( "fast", 0 );
        $('.jsLeadSectionScroll').fadeTo( "fast", 0 );
        var $window_height = $(window).height();
        var $lead_section_height = ($window_height / 2) + ($lead_height / 2);
        var $lead_section_height = $lead_section_height - ($lead_section_height * .10);
        var $lead_section_top = ($window_height / 2) - ($lead_height / 2) - 100;

        $('.jsLeadSectionContainer').css('top', $lead_section_top + "px");
        $('.jsLeadSectionContainer').fadeTo( "slow", 1 );
        $('.jsLeadSectionTitle').animate({
            height: $lead_section_height + "px"
        }, 2000, function() {
            $('.jsLeadSectionScroll').fadeTo( "slow", 1 );
            $('.jsLeadSectionContainer').addClass('jsScrollComplete');
        });
    }

    function navToggle($window)
    {
        if ( $window.scrollTop() >= $main_top ) {
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
        }

        if ( $window.scrollTop() >= $my_work_top ) {
            $('.jsFixedHeader').addClass('active');
            $('header').removeClass('active');
        } else {
            $('.jsFixedHeader').removeClass('active');
        }
    }
});