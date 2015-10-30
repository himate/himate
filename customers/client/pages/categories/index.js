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
    'click .js-categories .js-category': function(event) {
        Session.set('category', $(event.currentTarget).hasClass('js-all') ? null : this);
        Router.go('pages_vouchers');
        return Waslchiraa.Helpers.cancel(event);
    }
});
