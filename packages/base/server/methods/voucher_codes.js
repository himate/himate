/**
 * Vouchers
 */
Meteor.methods({

    /**
     * add the <doc> to the vouchers collection
     * @param {Object} doc
     */
    "reserve_voucher": function(voucherId) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['customer'])) {
            throw new Meteor.Error("not-authorized");
        }

        var voucher = Vouchers.findOne(voucherId);

        if (!voucher) {
            throw new Meteor.Error("not-found");
        }


        if (VoucherCodes.findOne({
            "userId": this.userId,
            "voucherId": voucher._id
        })) {
            throw new Meteor.Error("allready-reserved");
        }


        if (VoucherCodes.find({ "voucherId": voucher._id }).count() >= voucher.quantity) {
            throw new Meteor.Error("no_vouchers_available");
        }


        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var code = "";
        do {
            for (var i = 0; i < 6; i++) {
                code += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        while (Vouchers.findOne({"code": code}));

        VoucherCodes.insert({
            "code": code,
            "userId": this.userId,
            "voucherId": voucher._id
        });

        return code;
    },

    /**
     *
     */
    'get_user_voucher_codes': function() {
        // :TODO: refactor to pub/sub
        // collect data
        var voucherCodes = VoucherCodes.find({
            userId: Meteor.userId
        });

        var voucherCodes = voucherCodes.map(function(vc) {
            vc.voucher = Vouchers.findOne(vc.voucherId);
            return vc;
        });

        console.log(voucherCodes);

        return voucherCodes;
    }
});
