/**
 * we'll have to validate, if the corresponding user account is active. Users
 * with disabled accounts cannot login. We also have to ensure, that only
 * "merchants" can login into the merchant app.
 *
 * @param {Object} attemptObj
 */
Accounts.validateLoginAttempt(function(attemptObj) {

    if (!attemptObj.user) {
        return false;
    }

    if (attemptObj.user && attemptObj.allowed && attemptObj.user.disabled) {
        throw new Meteor.Error(403, "error_account_disabled");
    }

    if (!Roles.userIsInRole(attemptObj.user._id, 'merchant')) {
        throw new Meteor.Error(403, "error_no_merchant");
    }

    return true;
});
