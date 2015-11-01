// ----- iron:router hooks -----------------------------------------------------
/**
 * hook to save app state using css classes
 */
Router.onAfterAction(function() {
    if (Meteor.isClient) {
        var route = Router.current().route.getName().replace(/_/g, "-");
        $("body").removeAttr('class').addClass('pushable').addClass(route);
    }
});

// ----- custom hooks ----------------------------------------------------------

/**
 * user has to be an admin
 */
Router.adminRequired = function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        this.layout("layouts_default");
        this.render('errors_403');
    }
    else {
        this.next();
    }
};
