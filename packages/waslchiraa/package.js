Package.describe({
  name: 'waslchiraa',
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
  api.use('alanning:roles');
  api.use('aldeed:simple-schema');

  // collections
  api.addFiles([
    'collections/categories.js',
    'collections/messages.js',
    'collections/vouchers.js',
  ],['client','server']);
  api.export(['Categories','Vouchers','Messages']);

});



