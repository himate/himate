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
        $('#partials-sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
        return App.Helpers.cancel(event);
    }
});

// ----- template books --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_languages.onRendered(function() {
    $('#partials-languages .dropdown').dropdown();
});
