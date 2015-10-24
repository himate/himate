/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

/**
 * vouchers
 */
Router.route('/vouchers', {
    name: 'pages_vouchers',
    onBeforeAction: Router.merchantRequired,
});

/**
 * vouchers add
 */
Router.route('/vouchers/add', {
    name: 'pages_vouchers_add',
    onBeforeAction: Router.merchantRequired
});

/**
 * voucher details
 */
Router.route('/vouchers/:_id', {
    name: 'pages_vouchers_details',
    onBeforeAction: Router.merchantRequired
});

/**
 * voucher details
 */
Router.route('/vouchers/:_id/edit', {
    name: 'pages_vouchers_edit',
    onBeforeAction: Router.merchantRequired
});


/**
 * about us
 */
Router.route('/profile', {
    name: 'pages_profile'
});


/**
 * about us
 */
Router.route('/about-us', {
    name: 'pages_about_us'
});

/**
 * about us
 */
Router.route('/how-it-works', {
    name: 'pages_how_it_works'
});

/**
 * about us
 */
Router.route('/verify-refugee', {
    name: 'pages_verify_refugee',
    onBeforeAction: Router.merchantRequired
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
    template: 'pages_sign_in',
    layoutTemplate: 'layouts_default',
    redirect: '/vouchers',
});
