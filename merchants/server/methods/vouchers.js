/**
 * Vouchers
 */
Meteor.methods({

    /**
     * add the <doc> to the vouchers collection
     * @param {Object} doc
     */
    "vouchers_add": function(doc) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(doc, Object);
        check(doc.title, String);
        check(doc.categoryId, String);
        check(doc.description, Match.Optional(String));

        // link doc to current user
        doc.userId = Meteor.userId();

        // action
        return Vouchers.insert(doc);
    },

    /**
     * update the given <doc>
     * @param {Object} doc
     * @param {String} id
     */
    "vouchers_edit": function(doc, id) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            throw new Meteor.Error("not-authorized");
        }

        console.log(id);

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
            quantity: Number,
            published: Date,
            description: Match.Optional(String)
        });

        // ensure the doc is linked to the current user (merchant)
        doc.$set.userId = Meteor.userId();

        // save update
        return Vouchers.update(id, doc);
    },

    /**
     * @param {Object} doc
     */
    "vouchers_remove": function(id) {

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
});
