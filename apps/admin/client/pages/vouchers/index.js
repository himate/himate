// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    codes: function() {
        var filter = {};
        var options = {
            sort: {
                redeemed: -1
            }
        };

        var pageNumber = Session.get('pagination_page');
        var pageSize = Session.get('pagination_page_size');

        if (typeof pageNumber !== 'undefined') {
            options.limit = pageSize;
            options.skip = pageNumber * pageSize;
        }

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
