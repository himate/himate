Template.voucher.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    campaign: function() {
        return HiMate.Helpers.customers.vouchers.campaign();
    }
});


