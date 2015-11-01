// ----- template helpers ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.helpers({

    /**
     * return all voucher codes
     * @reactive
     */
    vouchers: function() {
        Meteor.call('get_user_vouchers', function (error, data) {
            Session.set('user_vouchers', data);
        });

        return Session.get('user_vouchers');
    }
});


// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     * jump to details page, if user clicks on a list item
     * @param {Object} event
     */
    'click .items .item': function(event) {
        Router.go('pages_campaigns_details', {
            _id: this.campaignId
        });
        return Waslchiraa.Helpers.cancel(event);
    }
});

Template.pages_campaigns_voucher.events({

});
