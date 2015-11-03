// ----- private helper --------------------------------------------------------
var l = Waslchiraa.Helpers.subscriptionLogger;

// ----- routes ----------------------------------------------------------------
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
 * campaigns
 */
Router.route('/campaigns', {
    name: 'pages_campaigns',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('categories', l)];
    }
});

/**
 * campaigns add
 */
Router.route('/campaigns/add', {
    name: 'pages_campaigns_add',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories', l)];
    }
});

/**
 * voucher details
 */
Router.route('/campaigns/:_id', {
    name: 'pages_campaigns_details',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('categories', l)];
    }
});

/**
 * voucher details
 */
Router.route('/campaigns/:_id/edit', {
    name: 'pages_campaigns_edit',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('categories', l)];
    }
});

/**
 * voucher codes
 */
Router.route('/campaigns_codes/:_id', {
    name: 'pages_vouchers',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('vouchers', this.params._id, l)];
    }
});

/**
 * category details
 */
Router.route('/categories', {
    name: 'pages_categories',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories', l), Meteor.subscribe('campaigns', l)];
    }
});

/**
 * category details
 */
Router.route('/categories/add', {
    name: 'pages_categories_add',
    onBeforeAction: Router.adminRequired
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
