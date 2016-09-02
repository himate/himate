// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.helpers({

    /**
     * return all campaigns
     * @reactive
     */
    campaigns: function () {
        return HiMate.Helpers.customers.campaigns.campaigns();
    },

    /**
     *
     */
    category: function () {
        return HiMate.Helpers.customers.campaigns.category();
    }
});


// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_campaigns.events({

    /**
     * jump to categories page
     * @param {Object} event
     */
    'click .js-categories .js-category-item': function (event) {
        Router.go('pages_categories');
        return HiMate.Helpers.cancel(event);
    },

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .js-categories .js-voucher': function (event) {
        Router.go('pages_campaigns_details', {
            _id: this._id
        });
        return HiMate.Helpers.cancel(event);
    }

    /**
     * TODO:does it exist ?
     * user clicks on single/group filter
     * @param {Object} event
     */
    //'click .amount .item': function(event) {
    //    $('#pages-campaigns .amount .item').removeClass('active');
    //    $(event.currentTarget).addClass('active');
    //    Session.set('single', $(event.currentTarget).hasClass('single'));
    //    return HiMate.Helpers.cancel(event);
    //}
});

Template.pages_campaigns_voucher.events({});
