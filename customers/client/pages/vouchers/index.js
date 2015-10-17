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

// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     *
     */
    'click .item': function(event) {
        Router.go('pages_vouchers_details', {
            _id: this._id
        });
        return App.Helpers.cancel(event);
    }
});
