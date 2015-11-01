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
        return Waslchiraa.Collections.Categories.insert(doc);
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
        var voucher = Waslchiraa.Collections.Campaigns.findOne({
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
        return Waslchiraa.Collections.Categories.update(id, doc);
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

        var category = Waslchiraa.Collections.Categories.findOne(id);
        if (category) {
            //if it already has campaigns dont allow the remove
            if (!Waslchiraa.Collections.Campaigns.find({
                categoryId: id
            }).count() > 0) {
                Waslchiraa.Collections.Categories.remove(category._id);
                return "ok";
            }
            throw new Meteor.Error("has campaigns connected to it");
        }

        throw new Meteor.Error("not-found");
    }
});
