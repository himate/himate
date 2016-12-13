// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    codes: function(paginationOptions) {
        var filter = {};
        var codesOptions = {
            sort: {
                redeemed: -1
            }
        };

        var options = Object.assign({}, codesOptions, paginationOptions);

        if (Session.get('query')) {
            filter['code'] = new RegExp(Session.get('query'), "gi");
        }
        return HiMate.Collections.Vouchers.find(filter, options);
    },

    dataCursor: function() {
        return HiMate.Collections.Vouchers.find();
    },

    campaign: function() {
        return HiMate.Collections.Campaigns.findOne({
            _id: this.campaignId
        }, {});
    }
});
