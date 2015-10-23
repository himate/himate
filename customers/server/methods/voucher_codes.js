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

        var voucher = Vouchers.findOne({
            _id: voucherId
        });
        if (voucher) {
            //TODO: check voucher availability

            if(VoucherCodes.findOne({"userId":this.userId, "voucherId":voucher._id})){
                throw new Meteor.Error("allready-reserved");
            }

            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var code = "";
            do{
                for (var i = 0; i < 6; i++) {
                    code += possible.charAt(Math.floor(Math.random() * possible.length));
                }
            }while(Vouchers.findOne({"code": code }));

            VoucherCodes.insert({
                "code": code,
                "userId": this.userId,
                "voucherId": voucher._id
            });

            return code;
        }else{
            throw new Meteor.Error("voucher-does-not-exist");
        }
    },

    /**
     * update the given <doc>
     * @param {Object} doc
     * @param {String} id
     */
    "vouchers_edit": function (doc, id) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        // voucher should be owned by the current user
        var voucher = Vouchers.findOne({
            _id: id,
            userId: Meteor.userId()
        });
        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        // check user input
        check(id, String);
        check(doc, Object);
        check(doc.$set, {
            title: String,
            categoryId: String,
            description: Match.Optional(String)
        });
        check(doc.$unset, Match.Optional({
            description: String
        }));

        // any edit will set the voucher offline
        doc.$set.published = null;

        // ensure the doc is linked to the current user (merchant)
        doc.$set.userId = Meteor.userId();

        // save update
        return Vouchers.update(id, doc);
    },

    /**
     * @param {Object} doc
     */
    "vouchers_remove": function (id) {

        // check user input
        check(id, String);

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
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
})
;
