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
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(doc, Object);
        check(doc.title, String);
        check(doc.description, Match.Optional(String));
        check(doc.userId, String);
        check(doc.categoryId, String);
        check(doc.published, Match.Optional(Date));

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
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        var voucher = Vouchers.findOne(id);
        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        // check user input
        check(id, String);
        check(doc, Object);
        check(doc.$set, {
            title: String,
            description: Match.Optional(String),
            userId: String,
            categoryId: String,
            published: Match.Optional(Date)
        });
        check(doc.$unset, Match.Optional({
            description: Match.Optional(String),
            published: Match.Optional(String)
        }));

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
