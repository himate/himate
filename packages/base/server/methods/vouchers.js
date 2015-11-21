/**
 * Waslchiraa.Collections.Campaigns
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
        var campaign = Waslchiraa.Collections.Campaigns.findOne(campaignId);
        if (!campaign) {
            throw new Meteor.Error("not-found");
        }

        if (Waslchiraa.Collections.Vouchers.findOne({
            "userId": this.userId,
            "campaignId": campaign._id
        })) {
            throw new Meteor.Error("allready-reserved");
        }

        if (Waslchiraa.Collections.Vouchers.find({
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
        while (Waslchiraa.Collections.Campaigns.findOne({"code": code}));

        Waslchiraa.Collections.Vouchers.insert({
            "code": code,
            "userId": this.userId,
            "campaignId": campaign._id
        });

        var email = {
            to: Meteor.user().emails[0].address,
            from: TAPi18n.__('email_reserve_from'),
            subject: TAPi18n.__('email_reserve_subject', {
                title: campaign.title
            }),
            text: TAPi18n.__('email_reserve_content', {
                code: code
            }),
        };

        Email.send(email);
        return code;
    },

    /**
     *
     */
    'get_user_vouchers': function() {
        // :TODO: refactor to pub/sub!
        // collect data
        var voucherCodes = Waslchiraa.Collections.Vouchers.find({
            userId: Meteor.userId
        });

        voucherCodes = voucherCodes.map(function(vc) {
            vc.voucher = Waslchiraa.Collections.Campaigns.findOne(vc.campaignId);
            return vc;
        });

        return voucherCodes;
    },
    /**
     * @param {Object} code
     */
    'vouchers_get_campaign': function(code) {
        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(code, String);
        var voucher = checkVoucher(code)
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
        var voucher = checkVoucher(code)
        var campaign = getVoucherCampaign(voucher);

        Waslchiraa.Collections.Vouchers.update({
            code: code,
            campaignId: voucher.campaignId
        }, {
            $set: {
                redeemed: new Date()
            }
        });

        return true;
    }
});

var checkVoucher = function(code){
    var voucher = Waslchiraa.Collections.Vouchers.findOne({
        code: code
    });

    if (!voucher) {
        throw new Meteor.Error("voucher-not-found");
    }

    if (voucher.redeemed) {
        throw new Meteor.Error("already-redeemed");
    }
    return voucher;
}

var getVoucherCampaign = function (voucher){
    var campaign = Waslchiraa.Collections.Campaigns.findOne({
        userId: Meteor.userId(),
        _id: voucher.campaignId
    });

    if (!campaign) {
        throw new Meteor.Error("campaign-not-found");
    }
    return campaign;
};