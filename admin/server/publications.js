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

    return [vouchers, merchants];
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
