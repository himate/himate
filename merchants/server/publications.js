// ----- vouchers --------------------------------------------------------------
/**
 * publish all vouchers owned by the current user/merchant
 */
Meteor.publish('vouchers', function () {

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
            shortDescription: 1,
            description: 1,
            conditions: 1,
            categoryId: 1,
            created: 1,
            published: 1,
            quantity: 1,
            street: 1,
            number: 1,
            zipcode: 1,
            city: 1,
            country: 1
        }
    });
});

Meteor.publish('voucher_codes', function () {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }

    var vouchers = Vouchers.find({
            userId: this.userId
    });

    var voucherIds = vouchers.map(function(v) {
        return v._id;
    });

    return VoucherCodes.find({
            userId: this.userId,
            voucherId: {
                $in: voucherIds
            }
        }
    );
});

// ----- categories ------------------------------------------------------------
/**
 * publish all categories
 */
Meteor.publish('categories', function () {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'merchant')) {
        return this.ready();
    }

    // action
    return Categories.find();
});
