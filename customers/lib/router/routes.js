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
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
});

/**
 * vouchers
 */
Router.route('/vouchers/:_id', {
    name: 'pages_vouchers_details',
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
});

/**
 * categories
 */
Router.route('/categories', {
    name: 'pages_categories',
    waitOn: function() {
        return [Meteor.subscribe('categories')];
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
    redirect: '/vouchers',
});
