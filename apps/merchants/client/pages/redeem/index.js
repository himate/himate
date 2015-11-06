/**
 *
 */
Template.pages_redeem.events({

    /**
     * @param {Object} event
     * @return {Boolean} whether to submit the form, or not
     */
    "submit .redeem-voucher": function(event) {

        // Get value from form element
        var voucher = event.target.voucher.value;
        var result = Meteor.call('vouchers_redeem', voucher, function(err, data) {
            if (err) {
                Waslchiraa.Helpers.errorMessage(err.message);
            }
            else {
                Waslchiraa.Helpers.infoMessage('voucher ' + voucher + ' has been redeemed');
            }
        });

        event.target.voucher.value = "";
        return Waslchiraa.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.pages_redeem.onCreated(function() {
    Session.set('pageTitle', 'redeem_voucher');
});
