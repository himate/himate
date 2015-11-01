/**
 *
 */
AccountsTemplates.configure({

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,

    // Behaviours
    confirmPassword: true,
    enablePasswordChange: false,
    forbidClientAccountCreation: true,
    sendVerificationEmail: false,
    homeRoutePath: '/',
    redirectTimeout: 200,

    // Hooks
    onLogoutHook: function() {
        // redirect to start page after logout
        Router.go('pages_startpage');
    }
});
