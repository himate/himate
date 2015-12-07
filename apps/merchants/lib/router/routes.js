/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

/**
 * campaigns
 */
Router.route('/campaigns', {
    name: 'pages_campaigns',
    onBeforeAction: Router.merchantRequired
});

/**
 * campaigns add
 */
Router.route('/campaigns/add', {
    name: 'pages_campaigns_add',
    onBeforeAction: Router.merchantRequired
});

/**
 * voucher details
 */
Router.route('/campaigns/:_id', {
    name: 'pages_campaigns_details',
    onBeforeAction: Router.merchantRequired
});

/**
 * voucher details
 */
Router.route('/campaigns/:_id/edit', {
    name: 'pages_campaigns_edit',
    onBeforeAction: Router.merchantRequired
});

/**
 * voucher codes
 */
Router.route('/vouchers/:_id', {
    name: 'pages_vouchers',
    onBeforeAction: Router.merchantRequired,
    waitOn: function() {
        return [Meteor.subscribe('voucher_vouchers', this.params._id), Meteor.subscribe('voucher_users', this.params._id)];
    }
});

/**
 * redeem voucher codes
 */
Router.route('/redeem', {
    name: 'pages_redeem',
    onBeforeAction: Router.merchantRequired
});

/**
 * about us
 */
Router.route('/profile', {
    name: 'pages_profile',
    onBeforeAction: Router.merchantRequired
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
    redirect: '/campaigns',
});
AccountsTemplates.configureRoute('verifyEmail', {
    layoutTemplate: 'layouts_default',
    name: 'verifyEmail',
    path: '/verify-email'
});

AccountsTemplates.configureRoute('resetPwd', {
    layoutTemplate: 'layouts_default',
    name: 'resetPwd',
    path: '/reset-password'
});