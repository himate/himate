Template.voucherItem.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    campaign: function() {
        return HiMate.Helpers.customers.vouchers.campaign.call(this);
    }
});


Template.voucherItem.events({
    "click .item-voucher":function (event,template) {
        Router.go('campaign.details',{_id:template.data.campaignId,voucherId:template.data._id})
    },
});