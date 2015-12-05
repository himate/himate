/**
 * publish all campaigns
 */
Meteor.publish('campaigns', function() {

    // security checks
    //if (!Roles.userIsInRole(this.userId, 'customer')) {
    //    return this.ready();
    //}

    // collect data
    var today = moment().endOf('day').toDate();
    var campaigns = Waslchiraa.Collections.Campaigns.find({
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

    // campaigns.forEach(function (v) {
    //     v.codes = Waslchiraa.Collections.Vouchers.find({
    //         campaignId: v._id
    //     }).count();
    // });

    var merchantIds = campaigns.map(function(v) {
        return v.userId;
    });

    var categoryIds = campaigns.map(function(v) {
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

    // send collections
    return [campaigns, merchants];
});

/**
 * publish all categories
 */
Meteor.publish('categories', function() {

    // security checks
    //if (!Roles.userIsInRole(this.userId, 'customer')) {
    //    return this.ready();
    //}

    // send collection
    return Waslchiraa.Collections.Categories.find();
});

/**
 *
 */
Meteor.publish('vouchers', function(campaignIds) {

    check(campaignIds, Match.Optional(Array));

    var filter = {};
    if (campaignIds) {
        filter.campaignId = {
            $in: campaignIds
        };
    }

    return Waslchiraa.Collections.Vouchers.find(filter);
});

/**
 *
 */
Meteor.publish('images', function(campaignIds) {

    check(campaignIds, Match.Optional(Array));

    var filter = {};
    if (campaignIds) {
        filter.campaignId = {
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
