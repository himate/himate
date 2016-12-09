/**
 *
 */
AccountsTemplates.configure({

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,

    sendVerificationEmail: true,
    enforceEmailVerification:false,
    // Behaviours
    confirmPassword: true,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    homeRoutePath: '/about-us',
    redirectTimeout: 200,

    // Hooks
    onLogoutHook: function() {
        // redirect to start page after logout
        Router.go('pages_startpage');
    }
});
