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
    waitOn: function () {
        var filter = {};
        var c = Session.get('category');

        if (c) {
            filter.categoryId = c._id;
        }

        var voucherIds = Vouchers.find(filter).map(function (v) {
            return v._id;
        });

        return Meteor.subscribe('voucher_codes', voucherIds);
    }
});

/**
 * vouchers
 */
Router.route('/vouchers/:_id', {
    name: 'pages_vouchers_details'
});


/**
 * voucher codes
 */
Router.route('/voucher_codes', {
    name: 'pages_voucher_codes'
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
    redirect: '/vouchers',
});
