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

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_categories.events({

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .items .item': function(event) {
        Session.set('category', this);
        Router.go('pages_vouchers');
        return App.Helpers.cancel(event);
    }
});
