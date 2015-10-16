// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.helpers({

    /**
     *
     */
    title: function() {
        return Session.get('pageTitle');
    }
});

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.events({

    /**
     *
     */
    'click .sidebar': function(event) {
        $('#partials-sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
        return App.Helpers.cancel(event);
    },

    /**
     *
     */
    'click .logout': function(event) {
        AccountsTemplates.logout();
        return App.Helpers.cancel(event);
    }
});

// ----- template hooks -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.onRendered(function() {
    // :TODO....
});
