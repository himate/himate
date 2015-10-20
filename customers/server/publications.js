/**
 * publish all vouchers
 */
Meteor.publish('vouchers', function() {
    var today = moment().endOf('day').toDate();
    var vouchers = Vouchers.find({
        $and: [{
            published: {
                $lte: today
            }
        }, {
            published: {
                $exists: true
            }
        }, {
            published: {
                $ne: null
            }
        }]
    });

    var merchantIds = vouchers.map(function(v) {
        return v.userId;
    });

    var categoryIds = vouchers.map(function(v) {
        return v.categoryId;
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
    return Categories.find();
});
