// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers_details.helpers({
    /**
     * return data for current voucher
     * @reactive
     */
    item: function() {
        return Vouchers.findOne(Router.current().params._id);
    }
});


Template.pages_vouchers_details.events({

});
