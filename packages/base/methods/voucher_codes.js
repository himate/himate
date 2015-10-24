/**
 * Vouchers
 */
Meteor.methods({

    /**
     * add the <doc> to the vouchers collection
     * @param {Object} doc
     */
    "reserve_voucher": function (voucherId) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['customer'])) {
            throw new Meteor.Error("not-authorized");
        }

        var voucher = Vouchers.findOne( voucherId);

        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        //TODO: check voucher availability

        if (VoucherCodes.findOne({"userId": this.userId, "voucherId": voucher._id})) {
            throw new Meteor.Error("allready-reserved");
        }

        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var code = "";
        do {
            for (var i = 0; i < 6; i++) {
                code += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        } while (Vouchers.findOne({"code": code}));

        VoucherCodes.insert({
            "code": code,
            "userId": this.userId,
            "voucherId": voucher._id
        });

        return code;
    }
})
;
