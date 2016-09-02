// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    vouchers: function() {
        return HiMate.Helpers.customers.vouchers.vouchers();
    }
});

Template.pages_vouchers_voucher.helpers({
    /**
     *
     */
    campaign: function() {
        return  HiMate.Helpers.customers.vouchers.campaign();
    }
});

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .js-voucher': function(event) {
        Router.go('pages_campaigns_details', {
            _id: this.campaignId,voucherId: this._id} );
        return HiMate.Helpers.cancel(event);
    }
});
