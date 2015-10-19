// ----- vouchers --------------------------------------------------------------
/**
 * publish all vouchers
 */
Meteor.publish('vouchers', function() {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }

    // action
    return Vouchers.find({
        userId: this.userId
    }, {
        sort: {
            created: -1
        },
        fields: {
            title: 1,
            description: 1
        }
    });
});

/**
 * publish a single voucher and its details
 * @param {String} voucherId
 */
Meteor.publish('voucher', function(voucherId) {

    // check user input
    check(voucherId, String);

    // security checks
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }

    return Vouchers.find(voucherId);
});

// ----- categories ------------------------------------------------------------
/**
 * publish all categories
 */
Meteor.publish('categories', function() {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }

    // action
    return Categories.find();
});
