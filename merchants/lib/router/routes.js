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
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
});

/**
 * voucher details
 */
Router.route('/vouchers/:_id', {
    name: 'pages_vouchers_details',
    onBeforeAction: Router.merchantRequired,
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
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
    name: 'pages_verify_refugee'
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
