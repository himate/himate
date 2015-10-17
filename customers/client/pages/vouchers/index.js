// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return all vouchers
     * @reactive
     */
    vouchers: function() {
        var filter = {};
        var c = Session.get('category');
        if (c) {
            filter.categoryId = c._id;
        }
        return Vouchers.find(filter);
    },

    /**
     *
     */
    category: function() {
        var c = Session.get('category');
        if (c) {
            return c;
        }

        // if no category is set, we show all categories
        return {
            title: "All",
            voucherCount: Vouchers.find().count()
        };
    }
});

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     * jump to categories page
     * @param {Object} event
     */
    'click .items .category.item': function(event) {
        Router.go('pages_categories');
        return App.Helpers.cancel(event);
    },

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .items .item:not(.category)': function(event) {
        Router.go('pages_vouchers_details', {
            _id: this._id
        });
        return App.Helpers.cancel(event);
    },

    /**
     * user clicks on single/group filter
     * @param {Object} event
     */
    'click .amount .item': function(event) {
        $('#pages-vouchers .amount .item').removeClass('active');
        $(event.currentTarget).addClass('active');
        Session.set('single', $(event.currentTarget).hasClass('single'));
        return App.Helpers.cancel(event);
    }
});
