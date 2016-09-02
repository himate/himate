Template.campaignDetails.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    item: function () {
        console.log(HiMate.Helpers.customers.campaigns.item());
        return HiMate.Helpers.customers.campaigns.item();
    },
    voucherCode: function () {
        return HiMate.Helpers.customers.campaigns.voucherCode();
    },
    voucher:function(){
        return HiMate.Helpers.customers.campaigns.voucher();
    }
});