/**
 * Waslchiraa.Collections.Campaigns
 */
Meteor.methods({

    /**
     * add the <doc> to the campaigns collection
     * @param {Object} doc
     */
    "reserve_voucher": function(campaignId) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['customer'])) {
            throw new Meteor.Error("not-authorized");
        }

        var voucher = Waslchiraa.Collections.Campaigns.findOne(campaignId);

        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        if (Waslchiraa.Collections.Vouchers.findOne({
            "userId": this.userId,
            "campaignId": voucher._id
        })) {
            throw new Meteor.Error("allready-reserved");
        }

        if (Waslchiraa.Collections.Vouchers.find({
            "campaignId": voucher._id
        }).count() >= voucher.quantity) {
            throw new Meteor.Error("no_campaigns_available");
        }

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
            "campaignId": voucher._id
        });

        var email = {
            to: Meteor.user().emails[0].address,
            from: TAPi18n.__('email_reserve_from'),
            subject: TAPi18n.__('email_reserve_subject', {
                title: voucher.title
            }),
            text: TAPi18n.__('email_reserve_content', {
                code: code
            }),
        };

        Email.send(email);

        return code;
    },

    'get_user_vouchers': function() {
        // :TODO: refactor to pub/sub
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
    'redeemVoucher': function(code) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(code, String);

        var voucherCode = Waslchiraa.Collections.Vouchers.findOne({
            code: code
        });

        if (!voucherCode) {
            throw new Meteor.Error("not-found");
        }

        if (voucherCode.redeemed) {
            throw new Meteor.Error("already-redeemed");
        }

        var voucher = Waslchiraa.Collections.Campaigns.findOne({
            userId: this.userId,
            _id: voucherCode.campaignId
        });

        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        Waslchiraa.Collections.Vouchers.update({
            code: code,
            campaignId: voucherCode.campaignId
        }, {
            $set: {
                redeemed: new Date()
            }
        });

        return true;
    }
});
