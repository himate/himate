Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

  this.route('campaigns', {
    path: '/'
  });

  this.route('vouchers', {
    path: '/vouchers'
  });

  this.route('settings', {
    path: '/settings'
  });
});
