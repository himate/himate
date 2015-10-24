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
        return Categories.find();
    }
});

Template.pages_categories.events({

    "click #add_cat" :function (event){
        console.log("a link was clicked");
    },

    "click .remove-category" :function (event){
        //console.log("remove cat was clicked");
        Meteor.call("categories_remove",this._id);
    }
});
