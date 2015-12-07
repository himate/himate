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
        //$('#partials-sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
        $('.ui.sidebar').sidebar('toggle');
        var menu = event.currentTarget.id;
        $('#'+menu).parent().toggleClass('active');
        return Waslchiraa.Helpers.cancel(event);
    },
    /**
     * open/close the sidebar for mobile users
     * @param {Object} event
     */
    'touchstart .js-menu': function(event) {
        $('.ui.sidebar').sidebar('toggle');
        var menu = event.currentTarget.id;
        $('#'+menu).parent().toggleClass('active');
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
