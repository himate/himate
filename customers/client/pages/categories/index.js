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
     * jump back to vouchers after user selects a category
     * @param {Object} event
     */
    'click .items .item': function(event) {
        Session.set('category', $(event.currentTarget).hasClass('all') ? null : this);
        Router.go('pages_vouchers');
        return App.Helpers.cancel(event);
    }
});
