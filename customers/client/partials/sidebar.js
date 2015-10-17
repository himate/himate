// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_sidebar.events({

    /**
     *
     */
    'click .home': function() {
        Router.go('pages_startpage');
        $('.ui.sidebar').sidebar('toggle');
    },

    /**
     *
     */
    'click .item': function() {
        $('.ui.sidebar').sidebar('toggle');
    }
});
