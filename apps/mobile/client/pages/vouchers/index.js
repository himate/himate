Template.vouchers.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    vouchers: function() {
        return HiMate.Helpers.customers.vouchers.vouchers.call(this);
    },

    campaign: function() {
        return HiMate.Helpers.customers.vouchers.campaign.call(this);
    }
});
   

