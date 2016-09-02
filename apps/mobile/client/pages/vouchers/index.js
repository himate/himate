Template.vouchers.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    vouchers: function() {
        return HiMate.Helpers.customers.vouchers.vouchers();
    },

    campaign: function() {
        return HiMate.Helpers.customers.vouchers.campaign();
    }
});
   

