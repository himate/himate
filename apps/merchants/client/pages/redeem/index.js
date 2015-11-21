/**
 *
 */
Template.pages_redeem.helpers({
    campaign: function () {
        return Session.get('campaign');
    },
    voucherCode: function () {
        return Session.get('voucherCode');
    },
    isInvalid: function () {
        console.log(Session.get('invalid'));
        return Session.get('invalid');
    }

});
/**
 *
 */
Template.pages_redeem.events({

    "click .cancel-voucher": function(event) {
        event.preventDefault();
        Session.set('voucherCode', null);
        Session.set('invalid', false);
        Session.set('campaign', null);

    },
    /**
     * @param {Object} event
     * @return {Boolean} whether to submit the form, or not
     */
    "click .check-voucher": function(event) {
        event.preventDefault();
        // Get value from form element
        var voucherCode = $(event.target).closest('form').find('[name="voucher"]').val();
        console.log(voucherCode);
        var result = Meteor.call('vouchers_get_campaign', voucherCode, function(err, campaign) {
            if (err) {
                Waslchiraa.Helpers.errorMessage(err.message);
                Session.set('invalid', true);
                Session.set('campaign', null);
                Session.set('voucherCode', null);
            }
            else {
                console.log(campaign);
                Session.set('voucherCode', voucherCode);
                Session.set('invalid', false);
                Session.set('campaign', campaign);
            }
        });

        return Waslchiraa.Helpers.cancel(event);
    },

    /**
     * @param {Object} event
     * @return {Boolean} whether to submit the form, or not
     */
    "click .redeem-voucher": function(event) {
        event.preventDefault();
        // Get value from form element
        var voucher = Session.get('voucherCode');
        var result = Meteor.call('vouchers_redeem', voucher, function(err, data) {
            if (err) {
                Waslchiraa.Helpers.errorMessage(err.message);
            }
            else {
                Waslchiraa.Helpers.infoMessage('voucher ' + voucher + ' has been redeemed');
                Session.set('voucherCode', null);
                Session.set('invalid', false);
                Session.set('campaign', null);
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
    Session.set('voucherCode', null);
    Session.set('invalid', false);
    Session.set('campaign', null);
    Session.set('pageTitle', 'redeem_voucher');
});
