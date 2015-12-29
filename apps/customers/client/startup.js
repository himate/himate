/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // close sidebar after login
    Accounts.onLogin(function() {
        $('#partials-sidebar').sidebar('hide');
        $('#partials-main-menu').removeClass('active');
        $('#partials-languages').removeClass('active');
    });

    HiMate.Helpers.setDefaultLanguage();
});
