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
        console.log(Router.current().params._id);
        return Waslchiraa.Collections.Campaigns.findOne(Router.current().params._id);
    }
});


Template.pages_campaigns_details.events({

});
