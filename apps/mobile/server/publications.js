/**
 * publish all campaigns
 */
Meteor.publish('campaigns', function () {

    // collect data
    var today = moment().endOf('day').toDate();
    var campaigns = HiMate.Collections.Campaigns.find({
        $or: [{
            end: null
        }, {
            $and: [{
                approved: true
            },{
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
        }]
    });

    var merchantIds = campaigns.map(function (v) {
        return v.userId;
    });

   /* var categoryIds = campaigns.map(function (v) {
        return v.categoryId;
    });

    var categories = HiMate.Collections.Categories.find({
        _id: {
            $in: categoryIds
        }

    });
*/
    var merchants = Meteor.users.find({
        _id: {
            $in: merchantIds
        }
    }, {
        fields: {
            "profile.company": 1,
            "profile.firstName": 1,
            "profile.lastName": 1,
            "profile.street": 1,
            "profile.number": 1,
            "profile.zipcode": 1,
            "profile.city": 1,
            "profile.country": 1
        }
    });

    // send collections
    return [campaigns, merchants];
});

Meteor.publish('categories', function (categoryIds) {
    return HiMate.Collections.Categories.find({_id: {$in: categoryIds}});
});


/**
 *
 */
Meteor.publish('images', function (campaignIds) {

    check(campaignIds, Match.Optional(Array));

    var filter = {};
    if (campaignIds) {
        filter._id = {
            $in: campaignIds
        };
    }

    var imageIds = HiMate.Collections.Campaigns.find(filter).map(function (v) {
        return v.imageId;
    });

    //
    return HiMate.Collections.Images.find({
        _id: {
            $in: imageIds
        }
    });
});

/**
 *
 */
Meteor.publish('vouchers', function (campaignIds) {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'customer')) {
        return this.ready();
    }

    check(campaignIds, Match.Optional(Array));

    var filter = {};
    filter.userId = this.userId;
    if (campaignIds) {
        filter.campaignId = {
            $in: campaignIds
        };
    }

    return HiMate.Collections.Vouchers.find(filter);
});
