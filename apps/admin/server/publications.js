/**
 * publish all campaigns
 */
Meteor.publish('campaigns', function() {

    // security checks
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }

    // collect data
    var campaigns = Waslchiraa.Collections.Campaigns.find();
    var merchantIds = campaigns.map(function(v) {
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

/**
 * publish all vouchers with the given <campaignId>
 */
Meteor.publish("vouchers", function(campaignId) {
    return Waslchiraa.Collections.Vouchers.find({
        'campaignId': campaignId
    });
});

/**
 * publish all categories
 */
Meteor.publish('categories', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Waslchiraa.Collections.Categories.find();
});

/**
 * publish all users
 */
Meteor.publish('users', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }

    return Meteor.users.find({}, {
        fields: {
            username: 1,
            roles: 1,
            createdAt: 1,
            "profile.firstName": 1,
            "profile.lastName": 1,
            emails: 1,
            disabled: 1,
            status: 1
        }
    });
});

/**
 * publish all images
 */
Meteor.publish('images', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Waslchiraa.Collections.Images.find();
});

/**
 * publish all activities
 */
Meteor.publish('activities', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Waslchiraa.Collections.Activities.find();
});

/**
 * publish all reports
 */
Meteor.publish('reports', function() {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }
    return Waslchiraa.Collections.Reports.find();
});
