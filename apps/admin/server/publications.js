/**
 * publish all campaigns
 */
Meteor.publish('campaigns', function () {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }

    // collect data
    var campaigns = Waslchiraa.Collections.Campaigns.find();
    var merchantIds = campaigns.map(function (v) {
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

    return [campaigns, merchants];
});

Meteor.publish("vouchers", function (campaignId) {
    return Waslchiraa.Collections.Vouchers.find({'campaignId': campaignId});
});

/**
 * publish all categories
 */
Meteor.publish('categories', function () {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Waslchiraa.Collections.Categories.find();
});

/**
 * publish all users
 */
Meteor.publish('users', function () {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Meteor.users.find();
});
