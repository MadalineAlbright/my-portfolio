$(document).ready(function () {
    // Navbar scroll effect
    let navbar = $('.navbar');
    let scrollOffset = 50;

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > scrollOffset) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }

        // Update active nav button
        let scrollPos = $(window).scrollTop() + 100;
        $('section').each(function () {
            let sectionTop = $(this).offset().top;
            let sectionHeight = $(this).height();
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                let sectionId = $(this).attr('id');
                $('.nav-btn').removeClass('active');
                $(`a[href="#${sectionId}"]`).addClass('active');
            }
        });
    });

    // Smooth scroll for internal links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        
        let target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800, 'easeInOutQuad');
        }
    });

    // Scroll to next section button
    $('.scroll-indicator').on('click', function () {
        let nextSection = $('section').eq(1);
        if (nextSection.length) {
            $('html, body').stop().animate({
                scrollTop: nextSection.offset().top - 70
            }, 800, 'easeInOutQuad');
        }
    });

    // Project filtering
    $('.filter-btn').on('click', function () {
        let filter = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter project cards
        if (filter === 'all') {
            $('.project-card').removeClass('hidden');
        } else {
            $('.project-card').addClass('hidden');
            $(`.project-card[data-category="${filter}"]`).removeClass('hidden');
        }
    });

    // Resume modal functionality
    let resumeModal = $('#resumeModal');
    
    // Open modal
    $('.resume-btn').on('click', function (e) {
        e.preventDefault();
        resumeModal.addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    // Close modal
    $('.modal-close, .modal-close-btn').on('click', function () {
        resumeModal.removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Close modal when clicking outside
    $(document).on('click', function (e) {
        if ($(e.target).is(resumeModal)) {
            resumeModal.removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
});

// Add easing function
$.easing.easeInOutQuad = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
};
