Package.describe({
    name: 'waslchiraa:base',
    version: '0.0.2',
    summary: '',
    git: 'https://github.com/waslchiraa/waslchiraa',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('email');
    api.use('mongo');
    api.use('templating', 'client');
    api.use('aldeed:autoform');
    api.use('aldeed:collection2');
    api.use('aldeed:simple-schema');
    api.use('less');
    api.use('tap:i18n');
    api.use('http');

    // collections
    api.addFiles([
        'lib/namespaces.js',
        'lib/helpers.js',
        'lib/collections/campaigns.js',
        'lib/collections/categories.js',
        'lib/collections/messages.js',
        'lib/collections/vouchers.js',
        'lib/locale/ar.i18n.json',
        'lib/locale/de.i18n.json',
        'lib/locale/en.i18n.json'
    ], [
        'client',
        'server'
    ]);

    api.addFiles([
        'client/less/base.less',
        'client/partials/messages.html',
        'client/partials/messages.js',
        'client/partials/messages.less',
        'client/helpers.js'
    ], ['client']);

    api.addFiles([
        'server/methods/campaigns.js',
        'server/methods/campaign_translate.js',
        'server/methods/categories.js',
        'server/methods/vouchers.js'
    ], ['server']);

    // export "Waslchiraa" namespace to be used in including apps
    api.export(['Waslchiraa']);
});
