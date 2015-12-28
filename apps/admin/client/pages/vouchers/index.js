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
        if (Session.get('query')) {
            filter['code'] = new RegExp(Session.get('query'), "gi");
        }
        return Waslchiraa.Collections.Vouchers.find(filter, {
            sort: {
                redeemed: -1
            }
        });
    }
});
