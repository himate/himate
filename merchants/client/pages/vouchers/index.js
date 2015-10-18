// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return all vouchers
     * @reactive
     */
    vouchers: function() {
        return Vouchers.find();
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.onCreated(function() {
    Session.set('pageTitle', 'vouchers');
});
