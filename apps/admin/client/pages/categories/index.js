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
        return Waslchiraa.Collections.Categories.find();
    },

    /**
     *
     */
    campaignCount: function() {
        return Waslchiraa.Collections.Campaigns.find({
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
     *
     * @param {Object} event
     */
    "click .remove-category": function(event) {
        Meteor.call("categories_remove", this._id);
    }
});
