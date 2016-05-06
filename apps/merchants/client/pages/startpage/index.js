// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_startpage.onCreated(function() {
    Session.set('pageTitle', 'merchants');
});

Template.pages_startpage.events({
    /**
     * logout current user
     * @param {Object} event
     */
    'click .js-logout': function(event) {
        AccountsTemplates.logout();
        return HiMate.Helpers.cancel(event);
    }
});
