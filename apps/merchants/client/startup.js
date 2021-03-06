/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // close sidebar after login
    Accounts.onLogin(function() {
        $('#partials-sidebar').sidebar('hide');
        $('#partials-main-menu').removeClass('active');
    });

    HiMate.Helpers.setDefaultLanguage();

    // set semantic-ui for forms
    AutoForm.setDefaultTemplate("semanticUI");
});
