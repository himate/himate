Template.layouts_default.events({
    /**
     */
    'click .dimmed': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    },
    /**
     */
    'touchstart .dimmed': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    }
});