// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_sidebar.events({

    /**
     *
     */
    'click .js-home': function() {
        Router.go('pages_startpage');
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
    },

    /**
     *
     */
    'click .js-navigation-link': function() {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').removeClass('active');
    }
});
