HiMate.Helpers.customers.vouchers={
    vouchers: function() {
        console.log('hello world');
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