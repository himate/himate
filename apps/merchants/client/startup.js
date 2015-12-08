/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // close sidebar after login
    Accounts.onLogin(function() {
        $('#partials-sidebar').sidebar('hide');
        $('#partials-main-menu').removeClass('active');
    });

    Waslchiraa.Helpers.setDefaultLanguage();

    // set semantic-ui for forms
    AutoForm.setDefaultTemplate("semanticUI");
});
