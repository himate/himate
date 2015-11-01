// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.events({

    /**
     * open/close the sidebar
     * @param {Object} event
     */
    'click .sidebar.toggle.item': function(event) {
        $('#partials-sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
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
