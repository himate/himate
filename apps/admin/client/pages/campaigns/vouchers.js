// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_campaigns_vouchers.helpers({

    /**
     *
     */
    campaign: function() {
        var id = Router.current().params._id;
        return HiMate.Collections.Campaigns.findOne(id);
    },

    /**
     * return data for current voucher
     * @reactive
     */
    codes: function() {
        return HiMate.Collections.Vouchers.find({
            campaignId: Router.current().params._id
        });
    }
});
