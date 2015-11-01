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
    waitOn: function () {
        var filter = {};
        var c = Session.get('category');

        if (c) {
            filter.categoryId = c._id;
        }

        var campaignIds = Waslchiraa.Collections.Campaigns.find(filter).map(function (v) {
            return v._id;
        });

        return [
            Meteor.subscribe('vouchers', campaignIds),
            Meteor.subscribe('campaigns'),
        ];
    }
});

/**
 * campaigns
 */
Router.route('/campaigns/:_id', {
    name: 'pages_campaigns_details',
    waitOn: function () {
        return [
            Meteor.subscribe('campaigns'),
            Meteor.subscribe('vouchers')
        ];
    }
});


/**
 * voucher codes
 */
Router.route('/vouchers', {
    name: 'pages_vouchers'
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
