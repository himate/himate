// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_languages.events({

    /**
     * toggle siderbar
     * @param {object} event
     */
    'click .js-sidebar': function(event) {
        $('#partials-sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
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
