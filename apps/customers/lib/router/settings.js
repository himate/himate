// default templates
Router.configure({
    layoutTemplate: 'layouts_default',
    loadingTemplate: 'partials_loading',
    notFoundTemplate: 'errors_404',
    waitOn: function () {
        var categoryIds=HiMate.Collections.Campaigns.find({}).map(function (v) {
            return v.categoryId;
        });
        return [Meteor.subscribe('campaigns'),Meteor.subscribe('categories',categoryIds)];
    }
});

// do not transform template names
Router.setTemplateNameConverter(_.identity);

// show default 404 error page for missing data in db
Router.plugin('dataNotFound', {
    notFoundTemplate: 'errors_404'
});
