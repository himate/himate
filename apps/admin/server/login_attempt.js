/**
 * we'll have to validate, if the corresponding user account is active. Users
 * with disabled accounts cannot login. We also have to ensure, that only
 * "admins" can login into the admin app.
 *
 * @param {Object} attemptObj
 */
Accounts.validateLoginAttempt(function(attemptObj) {

    if (attemptObj.user && attemptObj.allowed && attemptObj.user.disabled) {
        throw new Meteor.Error(403, "error_account_disabled");
    }

    if (!Roles.userIsInRole(attemptObj.user._id, 'admin')) {
        throw new Meteor.Error(403, "error_no_admin");
    }

    return true;
});
