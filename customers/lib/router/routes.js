/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

/**
 * about us
 */
Router.route('/about-us', {
    name: 'pages_about_us'
});

/**
 * privacy
 */
Router.route('/privacy', {
    name: 'pages_privacy'
});

/**
 * imprint
 */
Router.route('/imprint', {
    name: 'pages_imprint'
});

/**
 * sign-in (handled by AccountTemplates)
 */
AccountsTemplates.configureRoute('signIn', {
    name: 'pages_sign_in',
    path: '/login',
    template: 'pages_sign_in',
    layoutTemplate: 'layouts_default',
    redirect: '/about-us',
});
