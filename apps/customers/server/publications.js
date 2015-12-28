/**
 * publish all campaigns
 */
Meteor.publish('campaigns', function() {

    // collect data
    var today = moment().endOf('day').toDate();
    var campaigns = Waslchiraa.Collections.Campaigns.find({
        $or: [{
            end: null
        }, {
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
            }, {
                end: {
                    $gte: today
                }
            }]
        }]
    });

    var merchantIds = campaigns.map(function(v) {
        return v.userId;
    });

    var categoryIds = campaigns.map(function(v) {
        return v.categoryId;
    });

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

/**
 * publish all categories
 */
Meteor.publish('categories', function() {
    return Waslchiraa.Collections.Categories.find();
});

/**
 *
 */
Meteor.publish('images', function(campaignIds) {

    check(campaignIds, Match.Optional(Array));

    var filter = {};
    if (campaignIds) {
        filter._id = {
            $in: campaignIds
        };
    }

    var imageIds = Waslchiraa.Collections.Campaigns.find(filter).map(function(v) {
        return v.imageId;
    });

    //
    return Waslchiraa.Collections.Images.find({
        _id: {
            $in: imageIds
        }
    });
});

/**
 *
 */
Meteor.publish('vouchers', function(campaignIds) {

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

    return Waslchiraa.Collections.Vouchers.find(filter);
});
