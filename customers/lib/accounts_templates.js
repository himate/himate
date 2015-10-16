//Appearance
AccountsTemplates.configure({
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true
});

//Behaviour
AccountsTemplates.configure({
    confirmPassword: true,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    sendVerificationEmail: false,
    homeRoutePath: '/',
    redirectTimeout: 2000
});

//Texts
AccountsTemplates.configure({
    /* Title
     title: {
     changePwd: 'changePassword',
     enrollAccount: 'createAccount',
     forgotPwd: 'resetYourPassword',
     resetPwd: 'resetYourPassword',
     signIn: 'signIn',
     signUp: 'createAccount'
     },
     // Social Icons
     socialIcons: {
     facebook: 'facebook',
     google: 'google',
     'meteor-developer': 'rocket'
     },
     // Error Messages
     errors: {
     mustBeLoggedIn: 'error.accounts.Must be logged in',
     pwdMismatch: 'error.pwdsDontMatch',
     },
     // Info Messages
     info: {
     emailSent: 'info.emailSent',
     emailVerified: 'info.emailVerified',
     pwdChanged: 'info.passwordChanged',
     pwdReset: 'info.passwordReset',
     pwdSet: 'Password Set',
     singUpVerifyEmail: 'Registration Successful! Please check your email and follow the instructions.'
     },

     // Others
     socialAdd: 'add',
     socialConfigure: 'configure',
     socialRemove: 'remove',
     socialSignIn: 'signIn',
     socialSignUp: 'signUp',
     socialWith: 'with',
     sep: 'OR',
     pwdLink_link: 'forgotPassword',
     signInLink_pre: 'ifYouAlreadyHaveAnAccount',
     signInLink_link: 'signin',
     signUpLink_pre: 'dontHaveAnAccount',
     signUpLink_link: 'signUp',
     termsPreamble: 'clickAgree',
     termsPrivacy: 'privacyPolicy',
     termsAnd: 'and',
     termsTerms: 'terms',
     navSignIn: 'signIn',
     navSignOut: 'signOut',
     optionalField: 'optional'
     */
});
