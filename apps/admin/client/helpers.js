/**
 * @param {String} role
 * @param {String}|{Object} user
 * @return {Boolean}
 */
Template.registerHelper('userIsInRole', function(role, user) {
    if (user._id) {
        return Roles.userIsInRole(user._id, role);
    }
    return Roles.userIsInRole(user, role);
});
