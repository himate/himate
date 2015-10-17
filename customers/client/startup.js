/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    /**
     *
     */
    Accounts.onLogin(function() {
        // :TODO: discuss the desired behaviour, this could be the place to close the sidebar after login
        $('#partials-sidebar').sidebar('toggle');
    });
});
