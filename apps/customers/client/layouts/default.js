Template.layouts_default.events({
    /**
     */
    'click .pusher': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    },
    /**
     */
    'touchstart .pusher': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    }
});