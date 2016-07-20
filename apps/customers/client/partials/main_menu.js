// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_main_menu.events({

    /**
     * open/close the sidebar
     * @param {Object} event
     */
    'click .js-menu': function (event) {
        //console.log(event);
        //$('#partials-sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').toggleClass('active');
        return HiMate.Helpers.cancel(event);
    },
    /**
     * open/close the sidebar for mobile users
     * @param {Object} event
     */
    'touchstart .js-menu': function (event) {
        console.log(event);
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-main-menu').toggleClass('active');
        return HiMate.Helpers.cancel(event);
    },

    /**
     *
     */
    'click .locale-change': function (event, template) {
        HiMate.Helpers.setLanguage(this.tag);
        return HiMate.Helpers.cancel(event);
    },
    /**
     * logout current user
     * @param {Object} event
     */
    'click .logout': function (event) {
        AccountsTemplates.logout();
        return HiMate.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_main_menu.onRendered(function () {
    $('#partials-main-menu .js-dropdown').dropdown();
});
