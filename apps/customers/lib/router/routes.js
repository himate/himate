// ----- private helper --------------------------------------------------------
var l = HiMate.Helpers.subscriptionLogger;

// ----- routes ----------------------------------------------------------------
/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

/**
 * campaigns
 */
Router.map(function () {
    this.route('/campaigns', {
        name: 'pages_campaigns',
        waitOn: function () {
            var filter = {};
            var c = Session.get('category');

            if (c) {
                filter.categoryId = c._id;
            }

            var campaignIds = HiMate.Collections.Campaigns.find(filter).map(function (v) {
                return v._id;
            });

            return [
                Meteor.subscribe('vouchers', campaignIds, l),
                Meteor.subscribe('images', campaignIds, l),
                Meteor.subscribe('campaigns', l),
            ];
        },

    })
});

/**
 * campaigns
 */
Router.route('/campaigns/:_id', {
    name: 'pages_campaigns_details',
    waitOn: function () {
        return [
            Meteor.subscribe('campaigns', l),
            Meteor.subscribe('images', l),
            Meteor.subscribe('vouchers', l)
        ];
    }
});


/**
 * voucher codes
 */
Router.route('/vouchers', {
    name: 'pages_vouchers',
    waitOn: function () {
        return [
            Meteor.subscribe('campaigns', l),
            Meteor.subscribe('vouchers', l)
        ];
    }
});

/**
 * categories
 */
Router.route('/categories', {
    name: 'pages_categories'
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
    template: 'pages_sign_in',
    layoutTemplate: 'layouts_default',
    redirect: '/campaigns',
});


AccountsTemplates.configureRoute('verifyEmail', {
    layoutTemplate: 'layouts_default',
    name: 'verifyEmail',
    path: '/verify-email',
    redirect: '/campaigns',
});

AccountsTemplates.configureRoute('resetPwd', {
    layoutTemplate: 'layouts_default',
    name: 'resetPwd',
    path: '/reset-password',
    redirect: '/campaigns',
});


