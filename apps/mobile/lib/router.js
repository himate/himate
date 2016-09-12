var l = HiMate.Helpers.subscriptionLogger;

Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {

    this.route('campaigns', {
        path: '/',
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
                Meteor.subscribe('campaigns', l)
            ];
        },
    });

    this.route('campaign.details', {
        path: '/campaign/:_id/:voucherId?',
        waitOn: function () {
            return [
                Meteor.subscribe('campaigns', l),
                Meteor.subscribe('vouchers' , l),
                Meteor.subscribe('images',[this.params._id], l)
            ];
        }
    });

    this.route('vouchers', {
        path: '/vouchers',
        waitOn: function () {
            return [
                Meteor.subscribe('campaigns', l),
                Meteor.subscribe('vouchers', l)
            ];
        }
    });

    this.route('profile', {
        path: '/profile'
    });

    this.route('info', {
        path: '/info'
    });

});

Router.route('/sign-out', {
    name: 'signOut',
    onBeforeAction: function () {
        AccountsTemplates.logout();
        this.redirect('/');
    }
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    template: 'profile',
    layoutTemplate: 'layout',
    redirect: '/profile',
});