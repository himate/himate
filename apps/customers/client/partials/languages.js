// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_languages.events({

    /**
     * toggle siderbar
     * @param {object} event
     */
    'click .js-menu': function(event) {
        //$('#partials-sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-languages').toggleClass('active');
        return Waslchiraa.Helpers.cancel(event);
    },
    /**
     * open/close the sidebar for mobile users
     * @param {Object} event
     */
    'touchstart .js-menu': function(event) {
        $('.ui.sidebar').sidebar('toggle');
        $('#partials-languages').toggleClass('active');
        return Waslchiraa.Helpers.cancel(event);
    },
    /**
     *
     */
    'click .locale-change': function(event, template) {
        Waslchiraa.Helpers.setLanguage(this.tag);
        return Waslchiraa.Helpers.cancel(event);
    },
});

// ----- template hooks --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_languages.onRendered(function() {
    $('#partials-languages .dropdown').dropdown();
});
