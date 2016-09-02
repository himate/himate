var l = HiMate.Helpers.subscriptionLogger;

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

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

  this.route('voucher.details', {
    path: '/campaign/:_id'
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

  this.route('settings', {
    path: '/settings'
  });
});

Router.route('/sign-out', {
  name: 'signOut',
  onBeforeAction: function () {
    AccountsTemplates.logout();
    this.redirect('/');
  }
});