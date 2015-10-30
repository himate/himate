// ----- generic helpers -------------------------------------------------------
/**
 * @param {Object} event
 * @return {Boolean} whether to bubble <event> or not
 */
Waslchiraa.Helpers.cancel = function (event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
};

/**
 *
 */
Waslchiraa.Helpers.infoMessage = function (message) {
    Messages.insert({
        "message": message,
        "type": "info"
    });
};

/**
 *
 */
Waslchiraa.Helpers.errorMessage = function (message) {
    Messages.insert({
        "message": message,
        "type": "error"
    });
};

// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.registerHelper("eq", function (a, b) {
    return a == b;
});

/**
 *
 */
Template.registerHelper('pageTitle', function () {
    return Session.get('pageTitle');
});

/**
 * @param {String} userId
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('getUser', function (userId) {
    return Meteor.users.findOne(userId);
});

/**
 * @param {String} categoryId
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('getCategory', function (categoryId) {
    return Categories.findOne(categoryId);
});

/**
 * @param {Object} category
 * @return {Number} voucher count
 * @reactive
 */
Template.registerHelper('countVouchers', function (category) {
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
Template.registerHelper('formatDate', function (date) {
    if (date) {
        return moment(date).format('MM-DD-YYYY');
    } else {
        return '-';
    }
});



Waslchiraa.Helpers.getVoucherCodes = function (voucherId) {
    var result = {
        'available': 0,
        'total': 0,
        'reserved': 0,
        'redeemed': 0
    };
    var voucher = Vouchers.findOne({_id: voucherId});
    var now = new Date();
    if (voucher) {
        result = {
            'total': voucher.quantity,
            'reserved': VoucherCodes.find({'voucherId': voucherId, 'redeemed': null}).count(),
            'redeemed': VoucherCodes.find({'voucherId': voucherId, 'redeemed': {$lt: now}}).count(),
        };
        result.available = result.total - (result.redeemed + result.reserved);
    }
    return result;
};


Template.registerHelper('getVoucherCodes', function (voucherId) {
    Waslchiraa.Helpers.getVoucherCodes(voucherId);
});


Template.registerHelper('hasAvailableCodes', function (voucherId) {
    return Waslchiraa.Helpers.getVoucherCodes(voucherId).available > 0;
});

Template.registerHelper('isReservedByUser', function (voucherId) {
    return VoucherCodes.find({
        voucherId: voucherId,
        userId: Meteor.userId()
    }).count() > 0;
});

Template.registerHelper('getMapUrl', function (item) {
    return item ? 'https://www.google.de/maps/place/' + item.street + '+' + item.number + '+' + item.zipcode + '+' + item.city + '+' + item.country : '' ;
});


Template.registerHelper('translateField', function (object, field){
    var lang =  TAPi18n.getLanguage();
    if(object && object[field] && object[field][lang]){
        return object[field][lang];
    }else{
        return '';
    }
});

