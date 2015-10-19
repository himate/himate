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
        check(doc.description, Match.Optional(String));

        // merchant should never be able to publish
        doc.published = null;

        // link doc to current user
        doc.userId = Meteor.userId();

        // action
        return Vouchers.insert(doc);
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
