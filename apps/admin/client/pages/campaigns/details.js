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
        return Waslchiraa.Collections.Campaigns.findOne(Router.current().params._id);
    }
});
