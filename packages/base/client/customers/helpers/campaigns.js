HiMate.Helpers.customers.campaigns = {
    item: function () {
        var result = HiMate.Collections.Campaigns.findOne({
            _id: Router.current().params._id
        });
        return result;
    },

    voucherCode: function () {
        return Session.get("voucherCode");
    },

    voucher: function () {
        return HiMate.Collections.Vouchers.findOne({
            campaignId: this._id,
            userId: Meteor.userId()
        })
    },

    campaigns: function () {
        var filter = {};
        var c = Session.get('category');

        if (c) {
            filter.categoryId = c._id;
        }

        return HiMate.Collections.Campaigns.find(filter);
    },

    category: function () {
        var c = Session.get('category');
        if (c) {
            return c;
        }
        return null;
    }
}