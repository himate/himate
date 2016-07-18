// default templates
Router.configure({
    layoutTemplate: 'layouts_default',
    loadingTemplate: 'partials_loading',
    notFoundTemplate: 'errors_404',
    waitOn: function () {
        return Meteor.subscribe('campaigns');
    }
});

// do not transform template names
Router.setTemplateNameConverter(_.identity);

// show default 404 error page for missing data in db
Router.plugin('dataNotFound', {
    notFoundTemplate: 'errors_404'
});
