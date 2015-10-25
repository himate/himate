// ----- generic helpers -------------------------------------------------------
/**
 * @param {Object} event
 * @return {Boolean} whether to bubble <event> or not
 */
Waslchiraa.Helpers.cancel = function(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
};

/**
 *
 */
Waslchiraa.Helpers.infoMessage = function(message) {
    Messages.insert({
        "message": message,
        "type": "info"
    });
};

/**
 *
 */
Waslchiraa.Helpers.errorMessage = function(message) {
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

/**
 * @param {Object} date
 * @return {String} formatted date
 * @reactive
 */
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MM-DD-YYYY');
});

/**
 * TODO: replace dummy, refactor into package
 */
Template.registerHelper('getVoucherCodes', function(voucherId) {
    return {
        'reserved': [{}, {}, {}],
        'redeemed': [{}, {}]
    };
});

Template.registerHelper('getMapUrl', function (item) {
    return 'https://www.google.de/maps/place/' + item.street + '+' + item.number + '+' + item.zipcode + '+' + item.city + '+' + item.country ;
});
