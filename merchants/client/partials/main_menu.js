// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.events({

    /**
     *
     */
    'click .locale-change': function(event, template) {
        TAPi18n.setLanguageAmplify(this.tag);
        T9n.setLanguage(this.tag);
        return App.Helpers.cancel(event);
    },

    /**
     * open/close the sidebar
     * @param {Object} event
     */
    'click .sidebar.toggle.item': function(event) {
        $('#partials-sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
        return App.Helpers.cancel(event);
    },

    /**
     * logout current user
     * @param {Object} event
     */
    'click .logout': function(event) {
        AccountsTemplates.logout();
        return App.Helpers.cancel(event);
    }
});

// ----- template books --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_main_menu.onRendered(function() {
    $('#partials-main-menu .dropdown').dropdown();
});
