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
    'click .reserve-voucher': function (event, template) {
        var voucher = Vouchers.findOne(Router.current().params._id);
        if(voucher) {
            var vouchercode = Meteor.call('reserve_voucher',voucher._id.toString(), function(err, data){
                console.log( err, data);
                if(err) {
                    App.Helpers.errorMessage(err.message);
                }else{
                    App.Helpers.infoMessage('voucher ' + data + ' has been reserved');
                }
            });
        }
    },
});
