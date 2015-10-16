// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.partials_sidebar.helpers({
});

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

// ----- template books --------------------------------------------------------
/**
 *
 */
Template.partials_sidebar.onRendered(function() {
});

/**
 *
 */
Template.partials_sidebar.onCreated(function() {
});
