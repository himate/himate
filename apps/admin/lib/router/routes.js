var l = HiMate.Helpers.subscriptionLogger;

/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

// ----- users ----------------------------------------------------------------
/**
 * users
 */
Router.route('/users', {
    name: 'pages_users',
    onBeforeAction: Router.adminRequired
});

/**
 * users > add
 */
Router.route('/users/add', {
    name: 'pages_users_add',
    onBeforeAction: Router.adminRequired
});

/**
 * user > edit
 */
Router.route('/users/:_id', {
    name: 'pages_users_edit',
    onBeforeAction: Router.adminRequired
});

// ----- categories ------------------------------------------------------------
/**
 * categories
 */
Router.route('/categories', {
    name: 'pages_categories',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories', l), Meteor.subscribe('campaigns', l)];
    }
});

/**
 * categories > add
 */
Router.route('/categories/add', {
    name: 'pages_categories_add',
    onBeforeAction: Router.adminRequired
});

/**
 * categories > edit
 */
Router.route('/categories/:_id/edit', {
    name: 'pages_categories_edit',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories', l)];
    }
});

// ----- campaigns -------------------------------------------------------------
/**
 * campaigns
 */
Router.route('/campaigns', {
    name: 'pages_campaigns',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('categories', l), Meteor.subscribe('images', l)];
    }
});

/**
 * campaigns > add
 */
Router.route('/campaigns/add', {
    name: 'pages_campaigns_add',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('categories', l), Meteor.subscribe('images', l)];
    }
});

/**
 * campaigns > details
 */
Router.route('/campaigns/:_id', {
    name: 'pages_campaigns_details',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('categories', l), Meteor.subscribe('images', l)];
    }
});

/**
 * campaigns > edit
 */
Router.route('/campaigns/:_id/edit', {
    name: 'pages_campaigns_edit',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('categories', l), Meteor.subscribe('images', l)];
    }
});

/**
 * campaigns > voucher codes
 */
Router.route('/campaigns/:_id/vouchers', {
    name: 'pages_campaigns_vouchers',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('vouchers', this.params._id, l)];
    }
});

// ----- vouchers --------------------------------------------------------------
/**
 * vouchers
 */
Router.route('/vouchers', {
    name: 'pages_vouchers',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('campaigns', l), Meteor.subscribe('vouchers', l)];
    }
});

/**
 * imprint
 */
Router.route('/imprint', {
    name: 'pages_imprint'
});

/**
 * monitoring
 */
Router.route('/monitoring', {
    name: 'pages_monitoring',
    onBeforeAction: Router.adminRequired,
    waitOn: function() {
        return [Meteor.subscribe('activities', l), Meteor.subscribe('reports')];
    }
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
