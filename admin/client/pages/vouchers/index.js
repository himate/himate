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

// ----- template events ------------------------------------------------------
/**
 *
 */
Template.pages_vouchers.events({

    /**
     *
     */
    'click table .remove': function(event) {
        // :TODO: use semantic ui dialog & translate
        if (confirm('Delete Voucher "' + this.title + '"?')) {
            Meteor.call('vouchers_remove', this._id);
        }
        return Waslchiraa.Helpers.cancel(event);
    }
});
