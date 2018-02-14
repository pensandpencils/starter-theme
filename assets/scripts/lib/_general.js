// General Rules //


// Lazyload basic background image fadein function

function lazy(className, time) {
    $('.' + className).lazy({
        effect: "fadeIn",
        effectTime: time,
        threshold: 0
    });
}

jQuery(document).ready(function($) {

    // Lazy Load //

    lazy('img-load', 2000);


});