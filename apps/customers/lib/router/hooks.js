// ----- iron:router hooks -----------------------------------------------------
/**
 * hook to save app state using css classes
 */
Router.onAfterAction(function() {
    // use defer to avoid flickering...
    Meteor.defer(function() {
        var route = Router.current().route.getName().replace(/_/g, "-");
        $("body").removeAttr('class').addClass('pushable').addClass(route);
    });
});

// ----- custom hooks ----------------------------------------------------------
/**
 * check if user is logged in (check /lib/router/routes.js for usage)
 */
Router.loginRequired = function() {
    if (!Meteor.user()) {
        this.layout("layouts_default");
        this.render('errors_403');
    }
    else {
        this.next();
    }
};
