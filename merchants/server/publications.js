/**
 * publish all vouchers
 */
Meteor.publish('vouchers', function() {
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }
    return Vouchers.find();
});

/**
 * publish all categories
 */
Meteor.publish('categories', function() {
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }
    return Categories.find();
});
