// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_voucher_codes.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    voucher_codes: function() {
        Meteor.call('get_user_voucher_codes', function (error, data) {
            Session.set('user_voucher_codes', data);
        });

        return Session.get('user_voucher_codes');
    }
});


// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_voucher_codes.events({

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .items .item': function(event) {
        Router.go('pages_vouchers_details', {
            _id: this.voucherId
        });
        return App.Helpers.cancel(event);
    }
});

Template.pages_vouchers_voucher.events({

});
