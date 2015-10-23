// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_voucher_codes.helpers({

    /**
     * return data for current voucher
     * @reactive
     */
    codes: function() {
        console.log("codes: ", VoucherCodes.find());
        return VoucherCodes.find(Router.current().params._id);
    }
});
