/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // close sidebar after login
    Accounts.onLogin(function() {
        $('#partials-sidebar').sidebar('hide');
    });

    // :TODO: select language of user agent
    TAPi18n.setLanguage("en").done(function() {
        T9n.setLanguage("en");
    }).fail(function(error) {
        console.log(error);
    });

    // set semantic-ui for forms
    AutoForm.setDefaultTemplate("semanticUI");
});
