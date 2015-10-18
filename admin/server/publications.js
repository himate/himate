/**
 * publish all vouchers
 */
Meteor.publish('vouchers', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Vouchers.find();
});

/**
 * publish all categories
 */
Meteor.publish('categories', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Categories.find();
});

/**
 * publish all users
 */
Meteor.publish('users', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Meteor.users.find();
});
