Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('homepage', {
    path: '/'
  });

  this.route('compaigns', {
    path: '/compaigns'
  });

  this.route('vouchers', {
    path: '/vouchers'
  });

  this.route('settings', {
    path: '/settings'
  });
});
