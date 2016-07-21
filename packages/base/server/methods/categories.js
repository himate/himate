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
        check(doc, {
            title: {
                de: String,
                en: String,
                ar: String
            }
        });

        // action
        var id = HiMate.Collections.Categories.insert(doc);

        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            role: 'admin',
            entryId: id,
            route: 'pages_categories_edit',
            action: 'categories_add'
        });

        return id;
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

        // check user input
        check(id, String);
        check(doc, Object);
        check(doc.$set, {
            "title.de": String,
            "title.en": String,
            "title.ar": String,
            "title.fr": String,
        });

        // save update
        var result = HiMate.Collections.Categories.update(id, doc);

        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            role: 'admin',
            entryId: id,
            route: 'pages_categories_edit',
            action: 'categories_edit'
        });

        return result;
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

        // action
        var category = HiMate.Collections.Categories.findOne(id);
        if (category) {
            //if it already has campaigns dont allow the remove
            if (!HiMate.Collections.Campaigns.find({
                categoryId: id
            }).count() > 0) {
                HiMate.Collections.Categories.remove(category._id);

                HiMate.Collections.Activities.insert({
                    username: Meteor.user().username,
                    userId: Meteor.userId(),
                    role: 'admin',
                    entryId: id,
                    route: '',
                    action: 'categories_remove'
                });

                return "ok";
            }
            throw new Meteor.Error("has campaigns connected to it");
        }

        throw new Meteor.Error("not-found");
    }
});
