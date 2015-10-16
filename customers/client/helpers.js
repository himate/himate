// ----- generic helpers -------------------------------------------------------
App = {};
App.Helpers = {};

/**
 *
 */
App.Helpers.subscriptionLogger = {

    /**
     * @param {Object} result
     */
    onError: function(result) {
        console.log(result);
    }
};

/**
 *
 */
App.Helpers.onResize = function() {
    // :TODO: adjust selector, this one produces a very high document on desktop browsers
    $('.pushable, .pusher>div').css({
        'height': 'auto'
    });
    setTimeout(function() {
        var docHeight = $(document).height();
        $('.pushable, .pusher>div').css({
            'height': docHeight + "px"
        });
    }, 0);
};

/**
 *
 */
App.Helpers.cancel = function(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
};

// ----- template helpers ---------------------------------------------------
/**
 *
 */
Template.registerHelper("eq", function(a, b) {
    return a == b;
});
