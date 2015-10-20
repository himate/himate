/**
 * Vouchers
 */
Meteor.methods({

    /**
     * @param {Object} doc
     */
    "vouchers_remove": function(id) {

        // check user input
        check(id, String);

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        var voucher = Vouchers.findOne(id);
        if (voucher) {
            // :TODO: delete corresponding reservations
            // :TODO: perhaps we should flag as "deleted" instead?
            Vouchers.remove(voucher._id);
            return "ok";
        }

        throw new Meteor.Error("not-found");
    }
});
