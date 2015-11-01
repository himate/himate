// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_languages.events({

    /**
     * toggle siderbar
     * @param {object} event
     */
    'click .sidebar.toggle.item': function(event) {
        $('#partials-sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
        return Waslchiraa.Helpers.cancel(event);
    },

    /**
     *
     */
    'click .locale-change': function(event, template) {
        TAPi18n.setLanguageAmplify(this.tag);
        T9n.setLanguage(this.tag);
        return Waslchiraa.Helpers.cancel(event);
    },
});

// ----- template books --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_languages.onRendered(function() {
    $('#partials-languages .dropdown').dropdown();
});
