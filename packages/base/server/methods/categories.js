/**
 * Category
 */
Meteor.methods({

    /**
     * add the <doc> to the categories collection
     * @param {Object} doc
     */
    "categories_add": function(doc) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(doc, Object);
        check(doc.title, String);

        // action
        return Categories.insert(doc);
    },

    /**
     * update the given <doc>
     * @param {Object} doc
     * @param {String} id
     */
    "categories_edit": function(doc, id) {

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
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

        // save update
        return Categories.update(id, doc);
    },

    /**
     * @param {Object} doc
     */
    "categories_remove": function(id) {

        // check user input
        check(id, String);

        // security checks
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            throw new Meteor.Error("not-authorized");
        }

        var category = Categories.findOne(id);
        if (category) {
            //if it already has vouchers dont allow the remove
            if (!Vouchers.find({
                categoryId: id
            }).count() > 0) {
                Categories.remove(category._id);
                return "ok";
            }
            throw new Meteor.Error("has vouchers connected to it");
        }

        throw new Meteor.Error("not-found");
    }
});
