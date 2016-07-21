/**
 * HiMate.Collections.Campaigns
 */
Meteor.methods({

    /**
     * add the <doc> to the campaigns collection
     * @param {Object} doc
     */
    "vouchers_reserve": function(campaignId) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['customer'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(campaignId, String);

        // check voucher and avoid duplicates
        var campaign = HiMate.Collections.Campaigns.findOne(campaignId);
        if (!campaign) {
            throw new Meteor.Error("not-found");
        }

        if (HiMate.Collections.Vouchers.findOne({
            "userId": Meteor.userId(),
            "campaignId": campaign._id
        })) {
            throw new Meteor.Error("allready-reserved");
        }

        if (HiMate.Collections.Vouchers.find({
            "campaignId": campaign._id
        }).count() >= campaign.quantity) {
            throw new Meteor.Error("no_campaigns_available");
        }

        // generate new voucher
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var code = "";
        do {
            for (var i = 0; i < 6; i++) {
                code += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        while (HiMate.Collections.Campaigns.findOne({"code": code}));

        var voucherId = HiMate.Collections.Vouchers.insert({
            "code": code,
            "userId": Meteor.userId(),
            "campaignId": campaign._id
        });

        HiMate.Collections.Campaigns.countVouchers(campaign._id);

        Meteor.defer(function () {
            Meteor.call('send_voucher_reservation_email', code);
        });
        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            role: 'customer',
            entryId: campaign._id,
            code: code,
            route: 'pages_vouchers',
            action: 'vouchers_reserve'
        });

        return code;
    },

    "vouchers_remove": function(voucherId) {
        if (!Roles.userIsInRole(Meteor.userId(), ['customer'])) {
            throw new Meteor.Error("not-authorized");
        }

        var campaign = HiMate.Collections.Vouchers.findOne({
            _id: voucherId
        });

        HiMate.Collections.Vouchers.remove(voucherId);

        HiMate.Collections.Campaigns.updateCampaignCount(campaign.campaignId);


    },

    /**
     * @param {Object} code
     */
    'vouchers_get_campaign': function(code) {
        // :TODO: refactor to pub/sub!

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(code, String);
        var voucher = checkVoucher(code);
        var campaign = getVoucherCampaign(voucher);
        return campaign;
    },

    /**
     * @param {Object} code
     */
    'vouchers_redeem': function(code) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(code, String);
        var voucher = checkVoucher(code);
        var campaign = getVoucherCampaign(voucher);

        HiMate.Collections.Vouchers.update({
            code: code,
            campaignId: voucher.campaignId
        }, {
            $set: {
                redeemed: new Date()
            }
        });

        HiMate.Collections.Campaigns.countVouchers(voucher.campaignId);
        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            role: 'merchant',
            entryId: voucher.campaignId,
            code: voucher.code,
            route: 'pages_vouchers',
            action: 'vouchers_redeem'
        });

        return true;
    }
});

/**
 *
 */
var checkVoucher = function(code) {
    var voucher = HiMate.Collections.Vouchers.findOne({
        code: code
    });

    if (!voucher) {
        throw new Meteor.Error("voucher-not-found");
    }

    if (voucher.redeemed) {
        throw new Meteor.Error("already-redeemed");
    }
    return voucher;
};

/**
 *
 * @param {Object} voucher
 */
var getVoucherCampaign = function(voucher) {
    var campaign = HiMate.Collections.Campaigns.findOne({
        userId: Meteor.userId(),
        _id: voucher.campaignId
    });

    if (!campaign) {
        throw new Meteor.Error("campaign-not-found");
    }
    return campaign;
};
