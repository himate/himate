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
    onBeforeAction: Router.adminRequired
});

/**
 * user details
 */
Router.route('/users/:_id', {
    name: 'pages_users_details',
    onBeforeAction: Router.adminRequired
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
 * vouchers add
 */
Router.route('/vouchers/add', {
    name: 'pages_vouchers_add',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories')];
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
 * voucher details
 */
Router.route('/vouchers/:_id/edit', {
    name: 'pages_vouchers_edit',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('vouchers'), Meteor.subscribe('categories')];
    }
});


/**
 * voucher codes
 */
Router.route('/vouchers_codes/:_id', {
    name: 'pages_voucher_codes',
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
