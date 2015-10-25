Package.describe({
  name: 'waslchiraa:base',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.use('mongo');
  api.use('templating', 'client');
  api.use('aldeed:autoform@5.7.1');
  api.use('aldeed:collection2');
  api.use('aldeed:simple-schema');
  api.use('less@2.5.0_3');
  api.use('http');

  // collections
  api.addFiles([
    'lib/namespaces.js',
    'lib/collections/categories.js',
    'lib/collections/messages.js',
    'lib/collections/vouchers.js',
    'lib/collections/voucher_codes.js',
  ],['client','server']);

  api.addFiles([
    'client/less/base.less',
    'client/partials/messages.html',
    'client/partials/messages.js',
    'client/partials/messages.less',
    'client/helpers.js'
  ],['client']);

  api.addFiles([
    'server/methods/vouchers.js',
    'server/methods/voucher_codes.js',
    'server/methods/categories.js',
    'server/methods/voucher_translate.js'
  ],['server']);

  api.export(['Waslchiraa', 'Categories','Vouchers','Messages','VoucherCodes']);

});
