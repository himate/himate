// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.events({

    /**
     *
     */
    'click .locale-change': function(event, template) {
        Waslchiraa.Helpers.setLanguage(this.tag);
        return Waslchiraa.Helpers.cancel(event);
    },

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

// ----- template books --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_main_menu.onRendered(function() {
    $('#partials-main-menu .dropdown').dropdown();
});
