// ----- vouchers --------------------------------------------------------------
/**
 * publish all vouchers owned by the current user/merchant
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
        fields: {
            title: 1,
            description: 1,
            categoryId: 1,
            created: 1,
            published: 1
        }
    });
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
