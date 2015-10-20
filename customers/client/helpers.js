// ----- name space ------------------------------------------------------------
App = {};
App.Helpers = {};

// ----- generic helpers -------------------------------------------------------
/**
 * @param {Object} event
 * @return {Boolean} whether to bubble <event> or not
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
 * @param {String} userId
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('getUser', function(userId) {
    return Meteor.users.findOne(userId);
});

/**
 * @param {String} categoryId
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('getCategory', function(categoryId) {
    return Categories.findOne(categoryId);
});

/**
 * @param {Object} category
 * @return {Number} voucher count
 * @reactive
 */
Template.registerHelper('countVouchers', function(category) {
    if (category) {
        return Vouchers.find({
            categoryId: category._id
        }).count();
    }

    return Vouchers.find().count();
});
