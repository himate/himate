// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     *
     */
    campaign: function() {
        var id = Router.current().params._id;
        return Waslchiraa.Collections.Campaigns.findOne(id);
    },

    /**
     * return data for current voucher
     * @reactive
     */
    codes: function() {
        return Waslchiraa.Collections.Vouchers.find();
    }
});
