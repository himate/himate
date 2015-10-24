/**
 * publish all vouchers
 */
Meteor.publish('vouchers', function() {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }

    // collect data
    var vouchers = Vouchers.find();
    var merchantIds = vouchers.map(function(v) {
        return v.userId;
    });

    var vourcherIds = vouchers.map(function(v) {
        return v._id;
    });

    // :TODO: select the right fields (merchant profile, name, company etc.)
    var merchants = Meteor.users.find({
        _id: {
            $in: merchantIds
        }
    }, {
        fields: {
            username: 1
        }
    });

    var voucher_codes = VoucherCodes.find({
        _id: {
            $in: vourcherIds
        }
    });

    return [vouchers, merchants, voucher_codes];
});

Meteor.publish("voucher_codes", function(){
  return VoucherCodes.find();
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
