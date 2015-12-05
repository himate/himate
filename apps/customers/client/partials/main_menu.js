// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.events({

    /**
     * open/close the sidebar
     * @param {Object} event
     */
    'click .js-menu': function(event) {
        $('#partials-sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
        return Waslchiraa.Helpers.cancel(event);
    },

    /**
     * logout current user
     * @param {Object} event
     */
    'click .logout': function(event) {
        AccountsTemplates.logout();
        return Waslchiraa.Helpers.cancel(event);
    }
});
