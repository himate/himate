// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_categories.helpers({

    /**
     * return all categories
     * @reactive
     */
    categories: function() {
        var filter = {};
        var locale = TAPi18n.getLanguage();
        if (Session.get('query')) {
            filter["title." + locale] = new RegExp(Session.get('query'), "gi");
            //filter["title"] = new RegExp(Session.get('query'), "gi");
        }

        return HiMate.Collections.Categories.find(filter);
    },

    /**
     *
     */
    campaignCount: function() {
        return HiMate.Collections.Campaigns.find({
            categoryId: this._id
        }).count();
    }
});

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_categories.events({

    /**
     * @param {Object} event
     */
    "click .remove-category": function(event) {
        Meteor.call("categories_remove", this._id, function(err, response) {
            if (err) {
                HiMate.Helpers.errorMessage(err.error);
                return;
            }
            HiMate.Helpers.infoMessage(response);
        });
    }
});
