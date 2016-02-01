// ----- iron:router hooks -----------------------------------------------------
/**
 * hook to save app state using css classes
 */
Router.onAfterAction(function () {
    var route = Router.current().route.getName().replace(/_/g, "-");
    $("body").removeAttr('class').addClass('pushable').addClass(route);
});

// ----- custom hooks ----------------------------------------------------------
/**
 * user has to be an admin
 */
Router.merchantRequired = function () {
    if (!Roles.userIsInRole(Meteor.userId(), 'merchant')) {
        this.layout("layouts_default");
        this.render('errors_403');
    }
    else {
        if (
            Meteor.user().profile &&
            Meteor.user().profile.company && Meteor.user().profile.company.length &&
            Meteor.user().profile.salutation && Meteor.user().profile.salutation.length &&
            Meteor.user().profile.firstName && Meteor.user().profile.firstName.length &&
            Meteor.user().profile.lastName && Meteor.user().profile.lastName.length &&
            Meteor.user().profile.street && Meteor.user().profile.street.length &&
            Meteor.user().profile.number && Meteor.user().profile.number.length &&
            Meteor.user().profile.zipcode && Meteor.user().profile.zipcode.length &&
            Meteor.user().profile.city && Meteor.user().profile.city.length &&
            Meteor.user().profile.country && Meteor.user().profile.country.length
        ) {
            this.next();
        }else{
            this.render('pages_profile');
        }
    }
};
