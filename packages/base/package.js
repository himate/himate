Package.describe({
    name: 'himate:base',
    version: '0.0.2',
    summary: '',
    git: 'https://github.com/himate/himate',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('email');
    api.use('mongo');
    api.use('check');
    api.use('templating', 'client');
    api.use('aldeed:autoform');
    api.use('aldeed:collection2');
    api.use('aldeed:simple-schema');
    api.use('less');
    api.use('tap:i18n');
    api.use('http');
    api.use('cfs:standard-packages');
    api.use('cfs:gridfs');
    api.use('cfs:autoform');
    api.use('cfs:graphicsmagick');
    api.use('matb33:collection-hooks');

    // collections
    api.addFiles([
        'lib/namespaces.js',
        'lib/schemas.js',
        'lib/helpers.js',
        'lib/collections/users.js',
        'lib/collections/activities.js',
        'lib/collections/campaigns.js',
        'lib/collections/categories.js',
        'lib/collections/images.js',
        'lib/collections/messages.js',
        'lib/collections/vouchers.js',
        'lib/locale/ar.i18n.json',
        'lib/locale/de.i18n.json',
        'lib/locale/en.i18n.json',
        'lib/locale/fr.i18n.json'
    ], [
        'client',
        'server'
    ]);

    api.addFiles([
        'client/less/base.less',
        'client/errors/403.html',
        'client/errors/404.html',
        'client/partials/messages.html',
        'client/partials/messages.js',
        'client/partials/messages.less',
        'client/helpers.js'
    ], ['client']);

    api.addFiles([
        'server/methods/campaigns.js',
        'server/methods/campaign_translate.js',
        'server/methods/categories.js',
        'server/methods/vouchers.js',
        'server/methods/users.js'
    ], ['server']);

    // export "HiMate" namespace to be used in including apps
    api.export(['HiMate']);
});
