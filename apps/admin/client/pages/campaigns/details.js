// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_details.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    item: function() {
        return HiMate.Collections.Campaigns.findOne(Router.current().params._id);
    }
});
