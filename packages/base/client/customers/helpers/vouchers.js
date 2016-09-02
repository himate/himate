HiMate.Helpers.customers.vouchers={
    vouchers: function() {
        return HiMate.Collections.Vouchers.find({}, {
            sort: {
                created: 1
            }
        });
    },
    campaign: function() {
        return HiMate.Collections.Campaigns.findOne({
            _id: this.campaignId
        }, {});
    }
}