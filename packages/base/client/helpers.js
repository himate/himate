// ----- private helper --------------------------------------------------------
/**
 * detect first browser language
 *
 * @return {String} locale
 */
var getPreferredLanguage = function() {
    var nav = window.navigator;
    var props = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    var lang = "";

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (var i = 0; i < nav.languages.length; i++) {
            lang = nav.languages[i];
            if (lang && lang.length) {
                break;
            }
        }
    }

    // support for other well known properties in browsers
    if (!lang) {
        for (var i = 0; i < props.length; i++) {
            lang = nav[props[i]];
            if (lang && lang.length) {
                break;
            }
        }
    }

    if (lang.indexOf('-') !== -1) {
        lang = lang.split('-')[0];
    }

    if (lang.indexOf('_') !== -1) {
        lang = lang.split('_')[0];
    }

    return lang ? lang : "en";
};

// ----- generic helpers -------------------------------------------------------
/**
 * used to log subscription errors to the console
 */
HiMate.Helpers.subscriptionLogger = {
    onError: function(result) {
        console.log(result);
    }
};

/**
 * stops event propagation
 *
 * @param {Object} event
 * @return {Boolean} false
 */
HiMate.Helpers.cancel = function(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
};

/**
 * default handler for method calls (show errors/server response as message)
 *
 * @param {Object} err
 * @param {String} response
 */
HiMate.Helpers.onAfterMethodCall = function(err, response) {
    if (err) {
        HiMate.Helpers.errorMessage(err.error);
        return;
    }
    HiMate.Helpers.infoMessage(response);
};

/**
 * set localization to users default browser language. Uses "en" as fallback.
 */
HiMate.Helpers.setDefaultLanguage = function() {

    var language = null;
    var languages = null;
    var storedLanguage = amplify.store('language');

    // try to restore old language selection
    if (!storedLanguage) {
        language = getPreferredLanguage();
        languages = TAPi18n.getLanguages();
        if (!languages[language]) {
            language = "en";
        }
    }
    else {
        language = storedLanguage;
    }

    HiMate.Helpers.setLanguage(language);
};

/**
 * set translations to specified <language>
 * @param {String} language
 */
HiMate.Helpers.setLanguage = function(language) {
    Meteor.defer(function() {
        amplify.store('language', language);
        TAPi18n.setLanguageAmplify(language).done(function() {
            moment.locale(language);
            T9n.setLanguage(language);
            Meteor.call('set_default_language', language);
        }).fail(function(error) {
            console.log(error);
        });
    });
};

/**
 * Simple kb/mb/gb size formatter
 *
 * @param {Number}
 * @return {String}
 */
HiMate.Helpers.sizify = function(value) {
    var ext = 'b';
    value = parseInt(value);
    if (value < 512000) {
        value = value / 1024.0;
        ext = 'kb';
    }
    else if (value < 4194304000) {
        value = value / 1048576.0;
        ext = 'mb';
    }
    else {
        value = value / 1073741824.0;
        ext = 'gb';
    }
    return Math.round(value, 2).toString() + " " + ext;
};

/**
 * creates an info popup on top of the main menu.
 * Should be used instead of "alert()" messages.
 *
 * @param {String} message
 */
HiMate.Helpers.infoMessage = function(message) {
    HiMate.Collections.Messages.insert({
        "message": message,
        "type": "info"
    });
};

/**
 * creates an error message on top of the main menu.
 * Should be used instead of "alert()" messages.
 *
 * @param {String} message
 */
HiMate.Helpers.errorMessage = function(message) {
    HiMate.Collections.Messages.insert({
        "message": message,
        "type": "error"
    });
};

/**
 * collect voucher details for the given campain
 *
 * @param {String} campaignId
 * @return {Object} (available, total, reserved, redeemed)
 * @reactive
 */
HiMate.Helpers.getVouchers = function(campaignId) {
    var result = {
        'available': 0,
        'total': 0,
        'reserved': 0,
        'redeemed': 0
    };
    var campaign = HiMate.Collections.Campaigns.findOne({
        _id: campaignId
    });
    var now = new Date();

    if (campaign) {
        result = {
            'total': campaign.quantity,
            'reserved': HiMate.Collections.Vouchers.find({
                'campaignId': campaignId,
                'redeemed': null
            }).count(),
            'redeemed': HiMate.Collections.Vouchers.find({
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
 * check if <a> equals <b>
 *
 * @param {String} a
 * @param {String} b
 * @return {Boolean}
 */
Template.registerHelper("eq", function(a, b) {
    return a == b;
});

/**
 * get the current pageTitle from global Session object
 *
 * @return {String}
 * @reactive
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
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('currentUserEmail', function() {
    return Meteor.user().emails[0].address;
});

/**
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('isCurrentUser', function(userId) {
    return Meteor.user()._id == userId;
});

/**
 * @param {String} categoryId
 * @return {Object} user or null
 * @reactive
 */
Template.registerHelper('getCategory', function(categoryId) {
    return HiMate.Collections.Categories.findOne(categoryId);
});

/**
 * Count campaigns related to given <category>. If no category is set, this will
 * count ALL campaigns.
 *
 * @param {Object} category
 * @return {Number} campaign count
 * @reactive
 */
Template.registerHelper('countCampaigns', function(category) {
    if (category) {
        return HiMate.Collections.Campaigns.find({
            categoryId: category._id
        }).count();
    }
    return HiMate.Collections.Campaigns.find().count();
});

/**
 * @param {Object} date
 * @return {String} formatted date
 * @reactive
 */
Template.registerHelper('formatDate', function(date, format) {

    // Spacebars.kw: if <format.hash> is present, then formatDate was called
    // without second parameter (<format>)...
    // So fall back to default format ('LL')
    // @see: http://stackoverflow.com/questions/27755891/meteor-what-is-spacebars-kw-hash-object
    if (format && format.hash) {
        format = 'lll';
    }

    if (date) {
        return moment(date).locale(TAPi18n.getLanguage()).format(format);
    }
    else {
        return '-';
    }
});

/**
 * Simple kb/mb/gb size snippet for templates:
 * {{ sizify file.size }}
 * @param {Number}
 * @return {String}
 */
Template.registerHelper("sizify", function(value) {
    return HiMate.Helpers.sizify(value);
});

/**
 * @see HiMate.Helpers.getVouchers
 * @param {String} campaignId
 * @reactive
 */
Template.registerHelper('getVouchers', function(campaignId) {
    return HiMate.Helpers.getVouchers(campaignId);
});

/**
 * returns the available vouchers for given <campaignId>
 *
 * @see HiMate.Helpers.getVouchers
 * @param {String} campaignId
 * @return {Number}
 * @reactive
 */
Template.registerHelper('availableVouchersCount', function(campaignId) {
    return HiMate.Helpers.getVouchers(campaignId).available;
});

/**
 * @see HiMate.Helpers.getVouchers
 * @param {String} campaignId
 * @return {Boolean}
 * @reactive
 */
Template.registerHelper('hasAvailableVouchers', function(campaignId) {
    return HiMate.Helpers.getVouchers(campaignId).available > 0;
});

/**
 * returns whether the user as reserved a voucher
 * for the given <campaignId>, or not
 *
 * @param {String} campaignId
 * @return {Boolean}
 * @reactive
 */
Template.registerHelper('isReservedByUser', function(campaignId) {
    return HiMate.Collections.Vouchers.find({
        campaignId: campaignId,
        userId: Meteor.userId()
    }).count() > 0;
});

/**
 * returns a url to google maps for the given <campaign>
 *
 * @param {Object} campaign
 * @return {String} url
 */
Template.registerHelper('getMapUrl', function(campaign) {
    return campaign ? 'https://www.google.de/maps/place/' + campaign.street + '+' + campaign.number + '+' + campaign.zipcode + '+' + campaign.city + '+' + campaign.country : '';
});

/**
 * load the localized version of a <field> of <object>. Returns "" if no translation
 * is available for the current language.
 *
 * @param {Object} object
 * @param {String} field
 * @return {String} translation
 * @reactive
 */
Template.registerHelper('translateField', function(object, field) {
    var lang = TAPi18n.getLanguage();

    // default behaviour
    if (object && object[field] && object[field][lang]) {
        return object[field][lang];
    }

    // old field, or wrong usage, show field + "*" as hint!
    if (object && object[field]) {
        return object[field] + '*';
    }

    // fallback: do nothing
    return '';
});

/**
 *
 */
Template.registerHelper('truncateEmail', function(email) {
    return email.substring(0, email.lastIndexOf("@"));
});

/**
 * @param {String} (optional) path
 * @return absolute url for this resource
 */
Template.registerHelper('absoluteUrl', function(path) {
    return Meteor.absoluteUrl() + (path ? path.toString() : "");
});
