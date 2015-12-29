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
        return HiMate.Collections.Vouchers.find();
    },

    /**
     *
     */
    campaign: function() {
        var id = Router.current().params._id;
        return HiMate.Collections.Campaigns.findOne(id);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.onCreated(function() {
    Session.set('pageTitle', 'vouchers');
});
