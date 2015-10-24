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
    },

    voucherCount: function(){
        var vouchers = Meteor.subscribe("vouchers");
        return Vouchers.find({categoryId: this._id}).count();
    }
});

Template.pages_categories.events({

    "click .remove-category" :function (event){
        Meteor.call("categories_remove",this._id);
    }
});
