/**
 *
 */
AccountsTemplates.configure({

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,

    // Behaviours
    confirmPassword: true,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    sendVerificationEmail: false,
    homeRoutePath: '/about-us',
    redirectTimeout: 200,

    // Hooks
    onLogoutHook: function() {
        // redirect to start page after logout
        Router.go('pages_startpage');
    }
});
