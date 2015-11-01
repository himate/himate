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
    Waslchiraa.Collections.Messages.insert({
        "message": message,
        "type": "info"
    });
};

/**
 *
 */
Waslchiraa.Helpers.errorMessage = function(message) {
    Waslchiraa.Collections.Messages.insert({
        "message": message,
        "type": "error"
    });
};

/**
 *
 */
Waslchiraa.Helpers.getCampaigns = function(campaignId) {
    var result = {
        'available': 0,
        'total': 0,
        'reserved': 0,
        'redeemed': 0
    };
    var campaign = Waslchiraa.Collections.Campaigns.findOne({
        _id: campaignId
    });
    var now = new Date();
    if (campaign) {
        result = {
            'total': campaign.quantity,
            'reserved': Waslchiraa.Collections.Vouchers.find({
                'campaignId': campaignId,
                'redeemed': null
            }).count(),
            'redeemed': Waslchiraa.Collections.Vouchers.find({
                'campaignId': campaignId,
                'redeemed': {
                    $lt: now
                }
            }).count(),
        };
        result.available = result.total - (result.redeemed + result.reserved);
    }
    return result;
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
    return Waslchiraa.Collections.Categories.findOne(categoryId);
});

/**
 * @param {Object} category
 * @return {Number} campaign count
 * @reactive
 */
Template.registerHelper('countCampaigns', function(category) {
    if (category) {
        return Waslchiraa.Collections.Campaigns.find({
            categoryId: category._id
        }).count();
    }
    return Waslchiraa.Collections.Campaigns.find().count();
});

/**
 * @param {Object} date
 * @return {String} formatted date
 * @reactive
 */
Template.registerHelper('formatDate', function(date) {
    if (date) {
        return moment(date).format('MM-DD-YYYY');
    }
    else {
        return '-';
    }
});

/**
 *
 */
Template.registerHelper('getCampaigns', function(campaignId) {
    return Waslchiraa.Helpers.getCampaigns(campaignId);
});

/**
 *
 */
Template.registerHelper('voucherCount', function(campaignId) {
    return Waslchiraa.Helpers.getCampaigns(campaignId).available;
});

/**
 *
 */
Template.registerHelper('hasAvailableVouchers', function(campaignId) {
    return Waslchiraa.Helpers.getCampaigns(campaignId).available > 0;
});

/**
 *
 */
Template.registerHelper('isReservedByUser', function(campaignId) {
    return Waslchiraa.Collections.Vouchers.find({
        campaignId: campaignId,
        userId: Meteor.userId()
    }).count() > 0;
});

/**
 *
 */
Template.registerHelper('getMapUrl', function(item) {
    return item ? 'https://www.google.de/maps/place/' + item.street + '+' + item.number + '+' + item.zipcode + '+' + item.city + '+' + item.country : '';
});

/**
 *
 */
Template.registerHelper('translateField', function(object, field) {
    var lang = TAPi18n.getLanguage();
    if (object && object[field] && object[field][lang]) {
        return object[field][lang];
    }
    else {
        return '';
    }
});

