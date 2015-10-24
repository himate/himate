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
  api.use('aldeed:autoform@5.7.1');
  api.use('aldeed:collection2');
  api.use('aldeed:simple-schema');
  api.use('less@2.5.0_3');

  // collections
  api.addFiles([
    'collections/categories.js',
    'collections/messages.js',
    'collections/vouchers.js',
    'collections/voucher_codes.js',
  ],['client','server']);
  api.addFiles([
    'less/base.less',
  ],['client']);

  api.addFiles([
    'methods/vouchers.js',
    'methods/categories.js',
  ],['server']);

  api.export(['Categories','Vouchers','Messages','VoucherCodes']);

});


