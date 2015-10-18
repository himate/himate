/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

/**
 * users
 */
Router.route('/users', {
    name: 'pages_users',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('users')];
    }
});

/**
 * user details
 */
Router.route('/users/:_id', {
    name: 'pages_users_details',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('users')];
    }
});

/**
 * vouchers
 */
Router.route('/vouchers', {
    name: 'pages_vouchers',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
});

/**
 * voucher details
 */
Router.route('/vouchers/:_id', {
    name: 'pages_vouchers_details',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
});

/**
 * category details
 */
Router.route('/categories', {
    name: 'pages_categories',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories')];
    }
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
    redirect: '/users',
});
