// ----- generic helpers -------------------------------------------------------
App = {};
App.Helpers = {};

/**
 *
 */
App.Helpers.cancel = function(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
};

// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.registerHelper("eq", function(a, b) {
    return a == b;
});

/**
 *
 */
Template.registerHelper('getUser', function(userId) {
    return Meteor.users.findOne(userId);
});

/**
 *
 */
Template.registerHelper('getCategory', function(categoryId) {
    return Categories.findOne(categoryId);
});
