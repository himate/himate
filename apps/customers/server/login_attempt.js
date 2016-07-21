/**
 * we'll have to validate, if the corresponding user account is active. Users
 * with disabled accounts cannot login. We also have to ensure, that only
 * "customers" can login into the customers app.
 *
 * @param {Object} attemptObj
 */
Accounts.validateLoginAttempt(function(attemptObj) {
    var lang = 'en';
    if(attemptObj.lastLanguage && attemptObj.lastLanguage.length){
        lang = attemptObj.lastLanguage;
    }

    if (attemptObj.user && attemptObj.allowed && attemptObj.user.disabled) {
        throw new Meteor.Error(403, TAPi18n.__("error_account_disabled",lang));
    }

    if (!Roles.userIsInRole(attemptObj.user._id, 'customer')) {
        throw new Meteor.Error(403, TAPi18n.__("error_no_customer",lang));
    }

    return true;
});
