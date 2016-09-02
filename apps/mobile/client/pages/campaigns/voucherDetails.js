Template.voucherDetails.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    item: function () {
        return HiMate.Helpers.customers.campaigns.item();
    },
    voucherCode: function () {
        return HiMate.Helpers.customers.campaigns.voucherCode();
    },
    voucher:function(){
        return HiMate.Helpers.customers.campaigns.voucher();
    }
});