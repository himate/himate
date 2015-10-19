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

/**
 *
 */
App.Helpers.infoMessage = function(message) {
    Messages.insert({
        "message": message,
        "type": "info"
    });
};

/**
 *
 */
App.Helpers.errorMessage = function(message) {
    Messages.insert({
        "message": message,
        "type": "error"
    });
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
Template.registerHelper('pageTitle', function() {
    return Session.get('pageTitle');
});
